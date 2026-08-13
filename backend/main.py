import json
import datetime
import httpx

from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from pydantic import BaseModel

from schemas.prediction import PredictionRequest
from services.model_service import predict
from services.economics import calculate_savings
from services.priority import get_priority
from services.recommendation import recommend

from database.connection import engine, Base, SessionLocal
from database.models import User, Prediction

from routes import wards

from auth import (
    hash_password,
    verify_password,
    create_access_token,
    get_current_user,
)

# ─── Config ────────────────────────────────────────────────
OPENWEATHER_API_KEY = "demo"   # Replace with your free key from openweathermap.org
OPENWEATHER_CITY    = "Delhi"

# ─── App ───────────────────────────────────────────────────
app = FastAPI(
    title="Smart Urban Resource Allocation API",
    version="2.0",
    description="AI-powered municipal waste management platform with SHAP explainability"
)

Base.metadata.create_all(bind=engine)
app.include_router(wards.router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ─── DB Dependency ─────────────────────────────────────────
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# ─── Auth Schemas ──────────────────────────────────────────
class LoginRequest(BaseModel):
    username: str
    password: str

class RegisterRequest(BaseModel):
    username: str
    password: str
    is_admin: bool = False


# ─── Auth Endpoints ────────────────────────────────────────
@app.post("/register", tags=["Auth"])
def register(req: RegisterRequest, db: Session = Depends(get_db)):
    existing = db.query(User).filter(User.username == req.username).first()
    if existing:
        raise HTTPException(status_code=400, detail="Username already exists")
    user = User(
        username=req.username,
        hashed_password=hash_password(req.password),
        is_admin=req.is_admin,
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return {"message": f"User '{req.username}' registered successfully"}


@app.post("/login", tags=["Auth"])
def login(req: LoginRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.username == req.username).first()
    if not user or not verify_password(req.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid username or password")
    token = create_access_token(data={"sub": user.username, "is_admin": user.is_admin})
    return {"token": token, "username": user.username, "is_admin": user.is_admin}


@app.get("/me", tags=["Auth"])
def me(current_user: dict = Depends(get_current_user)):
    return current_user


# ─── Core ──────────────────────────────────────────────────
@app.get("/")
def home():
    return {"message": "Smart Urban Resource Allocation API 🚀 v2.0"}


@app.get("/dashboard")
def dashboard():
    return {
        "total_bins": 150,
        "overflow_bins": 26,
        "fuel_saved": 32,
        "money_saved": 4750
    }


# ─── Predict (with SHAP + DB save) ─────────────────────────
@app.post("/predict", tags=["AI"])
def predict_overflow(request: PredictionRequest, db: Session = Depends(get_db)):
    data = {
        "area": request.area,
        "population": request.population,
        "temperature": request.temperature,
        "rainfall": request.rainfall,
        "holiday": request.holiday,
        "last_collection_hours": request.last_collection_hours,
        "waste_generated_kg": request.waste_generated_kg,
    }

    result      = predict(data)
    prediction  = result["prediction"]
    confidence  = result["confidence"]
    shap_data   = result.get("shap_explanation", [])

    priority        = get_priority(confidence)
    recommendation  = recommend(priority)
    economics       = calculate_savings(prediction)

    # ── Save prediction to DB ──────────────────────────────
    try:
        db_pred = Prediction(
            rainfall_mm=request.rainfall,
            temperature_c=request.temperature,
            is_holiday=bool(request.holiday),
            hours_since_last_collection=request.last_collection_hours,
            current_fill_percentage=request.waste_generated_kg,
            overflow_probability=confidence / 100,
            will_overflow=bool(prediction),
            explanation_json=json.dumps(shap_data),
        )
        db.add(db_pred)
        db.commit()
    except Exception:
        pass   # Don't break prediction if DB write fails

    return {
        "prediction":        prediction,
        "status":            "Overflow Expected" if prediction == 1 else "No Overflow",
        "confidence":        confidence,
        "priority":          priority,
        "recommended_action": recommendation,
        "shap_explanation":  shap_data,
        **economics,
    }


# ─── Prediction History from DB ────────────────────────────
@app.get("/history", tags=["AI"])
def get_history(limit: int = 50, db: Session = Depends(get_db)):
    """Returns the last N predictions saved in the database."""
    records = (
        db.query(Prediction)
        .order_by(Prediction.timestamp.desc())
        .limit(limit)
        .all()
    )
    return [
        {
            "id":               r.id,
            "timestamp":        r.timestamp.strftime("%Y-%m-%d %H:%M") if r.timestamp else "—",
            "will_overflow":    r.will_overflow,
            "confidence":       round(r.overflow_probability * 100, 1),
            "temperature":      r.temperature_c,
            "rainfall":         r.rainfall_mm,
            "is_holiday":       r.is_holiday,
            "hours_since_collection": r.hours_since_last_collection,
            "waste_kg":         r.current_fill_percentage,
        }
        for r in records
    ]


# ─── Live Weather ───────────────────────────────────────────
@app.get("/weather", tags=["Data"])
async def get_weather():
    """Fetch live weather for the configured city. Falls back to mock data."""
    try:
        url = (
            f"https://api.openweathermap.org/data/2.5/weather"
            f"?q={OPENWEATHER_CITY}&appid={OPENWEATHER_API_KEY}&units=metric"
        )
        async with httpx.AsyncClient(timeout=5) as client:
            resp = await client.get(url)
            if resp.status_code == 200:
                w = resp.json()
                return {
                    "city":        w["name"],
                    "temperature": w["main"]["temp"],
                    "humidity":    w["main"]["humidity"],
                    "rainfall":    w.get("rain", {}).get("1h", 0),
                    "description": w["weather"][0]["description"].title(),
                    "icon":        w["weather"][0]["icon"],
                    "source":      "live",
                }
    except Exception:
        pass

    # ── Mock fallback (no API key needed) ──────────────────
    import random
    return {
        "city":        OPENWEATHER_CITY,
        "temperature": round(random.uniform(28, 42), 1),
        "humidity":    random.randint(40, 85),
        "rainfall":    round(random.uniform(0, 15), 1),
        "description": "Partly Cloudy",
        "icon":        "02d",
        "source":      "mock",
    }


# ─── Other Endpoints ───────────────────────────────────────
@app.get("/waste-trend")
def waste_trend():
    return {
        "days":  ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        "waste": [220, 250, 240, 280, 310, 290, 330],
    }


@app.get("/overflow-summary")
def overflow_summary():
    return {"overflow": 26, "normal": 124}


@app.get("/wards")
def get_wards():
    return [
        {"ward": "Ward-1", "population": 8500, "waste": "420 kg", "overflow": "Yes"},
        {"ward": "Ward-2", "population": 5300, "waste": "210 kg", "overflow": "No"},
        {"ward": "Ward-3", "population": 7200, "waste": "390 kg", "overflow": "Yes"},
        {"ward": "Ward-4", "population": 4100, "waste": "180 kg", "overflow": "No"},
    ]