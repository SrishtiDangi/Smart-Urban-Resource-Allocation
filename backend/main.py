from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from schemas.prediction import PredictionRequest
from services.model_service import predict
app = FastAPI(
    title="Smart Urban Resource Allocation API",
    version="1.0"
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

    return {
        "prediction": int(result),
        "status": "Overflow Expected" if result == 1 else "No Overflow"
    }