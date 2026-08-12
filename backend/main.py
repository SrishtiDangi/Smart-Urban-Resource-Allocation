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
from database.models import User

from routes import wards

from auth import (
    hash_password,
    verify_password,
    create_access_token,
    get_current_user,
)


# ─── App ───────────────────────────────────────────────────
app = FastAPI(
    title="Smart Urban Resource Allocation API",
    version="1.0"
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
    """Register a new user. Returns success message."""
    existing = db.query(User).filter(User.username == req.username).first()
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Username already exists"
        )
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
    """Login with username and password. Returns JWT token."""
    user = db.query(User).filter(User.username == req.username).first()
    if not user or not verify_password(req.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid username or password"
        )
    token = create_access_token(
        data={"sub": user.username, "is_admin": user.is_admin}
    )
    return {"token": token, "username": user.username, "is_admin": user.is_admin}


@app.get("/me", tags=["Auth"])
def me(current_user: dict = Depends(get_current_user)):
    """Returns the currently authenticated user info."""
    return current_user


# ─── Core Endpoints ────────────────────────────────────────
@app.get("/")
def home():
    return {"message": "Backend Running 🚀"}


@app.get("/dashboard")
def dashboard():
    return {
        "total_bins": 150,
        "overflow_bins": 26,
        "fuel_saved": 32,
        "money_saved": 4750
    }


@app.post("/predict")
def predict_overflow(request: PredictionRequest):
    data = {
        "area": request.area,
        "population": request.population,
        "temperature": request.temperature,
        "rainfall": request.rainfall,
        "holiday": request.holiday,
        "last_collection_hours": request.last_collection_hours,
        "waste_generated_kg": request.waste_generated_kg,
    }
    result = predict(data)
    prediction = result["prediction"]
    confidence = result["confidence"]
    priority = get_priority(confidence)
    recommendation = recommend(priority)
    economics = calculate_savings(prediction)
    return {
        "prediction": prediction,
        "status": "Overflow Expected" if prediction == 1 else "No Overflow",
        "confidence": confidence,
        "priority": priority,
        "recommended_action": recommendation,
        **economics
    }


@app.get("/waste-trend")
def waste_trend():
    return {
        "days": ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        "waste": [220, 250, 240, 280, 310, 290, 330]
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




Base.metadata.create_all(
    bind=engine
)



app.include_router(
    wards.router
)

origins = [
    "http://localhost:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {
        "message": "Backend Running 🚀"
    }


@app.get("/dashboard")
def dashboard():
    return {
        "total_bins": 150,
        "overflow_bins": 26,
        "fuel_saved": 32,
        "money_saved": 4750
    }
@app.post("/predict")
def predict_overflow(request: PredictionRequest):

    data = {

        "area": request.area,
        "population": request.population,
        "temperature": request.temperature,
        "rainfall": request.rainfall,
        "holiday": request.holiday,
        "last_collection_hours": request.last_collection_hours,
        "waste_generated_kg": request.waste_generated_kg,

    }

    result = predict(data)

    prediction = result["prediction"]

    confidence = result["confidence"]

    priority = get_priority(confidence)

    recommendation = recommend(priority)

    economics = calculate_savings(prediction)

    return {

        "prediction": prediction,

        "status":
        "Overflow Expected"
        if prediction == 1
        else "No Overflow",

        "confidence": confidence,

        "priority": priority,

        "recommended_action": recommendation,

        **economics

    }
@app.get("/waste-trend")
def waste_trend():

    return {
        "days": [
            "Mon",
            "Tue",
            "Wed",
            "Thu",
            "Fri",
            "Sat",
            "Sun"
        ],
        "waste": [
            220,
            250,
            240,
            280,
            310,
            290,
            330
        ]
    }


@app.get("/overflow-summary")
def overflow_summary():

    return {
        "overflow": 26,
        "normal": 124
    }


@app.get("/wards")
def wards():

    return [
        {
            "ward": "Ward-1",
            "population": 8500,
            "waste": "420 kg",
            "overflow": "Yes"
        },
        {
            "ward": "Ward-2",
            "population": 5300,
            "waste": "210 kg",
            "overflow": "No"
        },
        {
            "ward": "Ward-3",
            "population": 7200,
            "waste": "390 kg",
            "overflow": "Yes"
        },
        {
            "ward": "Ward-4",
            "population": 4100,
            "waste": "180 kg",
            "overflow": "No"
        }
    ]