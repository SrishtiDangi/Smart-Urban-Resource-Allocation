import joblib
import pandas as pd

model = joblib.load("models/overflow_model.pkl")

def predict(data):
    df = pd.DataFrame([data])

    prediction = model.predict(df)[0]

    return prediction