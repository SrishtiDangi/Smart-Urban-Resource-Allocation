from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from schemas.prediction import PredictionRequest
from services.model_service import predict
from services.economics import calculate_savings
from services.priority import get_priority
from services.recommendation import recommend
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