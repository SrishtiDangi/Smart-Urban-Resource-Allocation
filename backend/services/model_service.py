import joblib
import pandas as pd

# Load trained model
model = joblib.load("models/overflow_model.pkl")


def predict(data):

    df = pd.DataFrame([data])

    # Prediction (0 or 1)
    prediction = int(model.predict(df)[0])

    # Probability
    probability = float(model.predict_proba(df)[0][1])

    return {
        "prediction": prediction,
        "confidence": round(probability * 100, 2)
    }