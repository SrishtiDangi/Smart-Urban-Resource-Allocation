from pydantic import BaseModel

class PredictionRequest(BaseModel):
    area: int
    population: int
    temperature: float
    rainfall: float
    holiday: int
    last_collection_hours: int
    waste_generated_kg: float