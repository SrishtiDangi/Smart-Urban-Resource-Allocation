from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

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