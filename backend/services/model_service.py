import joblib
import pandas as pd
import shap
import numpy as np

# Load trained model
model = joblib.load("models/overflow_model.pkl")

# Feature display names for UI
FEATURE_LABELS = {
    "area": "Ward Area",
    "population": "Population",
    "temperature": "Temperature (°C)",
    "rainfall": "Rainfall (mm)",
    "holiday": "Holiday",
    "last_collection_hours": "Hours Since Collection",
    "waste_generated_kg": "Waste Generated (kg)",
}

# SHAP explainer (TreeExplainer works fast with Random Forest)
explainer = shap.TreeExplainer(model)


def predict(data: dict) -> dict:
    df = pd.DataFrame([data])

    # Core prediction
    prediction = int(model.predict(df)[0])
    probability = float(model.predict_proba(df)[0][1])

    # SHAP values for explainability
    shap_values = explainer.shap_values(df)

    # For binary classification, use class-1 (overflow) SHAP values
    if isinstance(shap_values, list):
        sv = shap_values[1][0]   # class 1 = overflow
    else:
        sv = shap_values[0]

    feature_names = list(data.keys())
    feature_values = list(data.values())

    # Build SHAP explanation list sorted by absolute impact
    shap_explanation = []
    for i, fname in enumerate(feature_names):
        shap_explanation.append({
            "feature": FEATURE_LABELS.get(fname, fname),
            "value": feature_values[i],
            "shap": round(float(sv[i]), 4),
            "impact_pct": 0,  # filled below
        })

    # Calculate % contribution
    total_abs = sum(abs(e["shap"]) for e in shap_explanation) or 1
    for e in shap_explanation:
        e["impact_pct"] = round(abs(e["shap"]) / total_abs * 100, 1)

    # Sort by impact descending
    shap_explanation.sort(key=lambda x: abs(x["shap"]), reverse=True)

    return {
        "prediction": prediction,
        "confidence": round(probability * 100, 2),
        "shap_explanation": shap_explanation,
    }