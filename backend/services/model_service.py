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

# SHAP explainer
explainer = shap.TreeExplainer(model)


def predict(data: dict) -> dict:

    df = pd.DataFrame([data])

    # -----------------------------
    # CORE PREDICTION
    # -----------------------------

    prediction = int(model.predict(df)[0])

    probability = float(
        model.predict_proba(df)[0][1]
    )

    # -----------------------------
    # SHAP VALUES
    # -----------------------------

    shap_values = explainer.shap_values(df)

    # Handle different SHAP versions
    if isinstance(shap_values, list):

        # Older SHAP format
        sv = np.asarray(shap_values[1][0])

    else:

        # Newer SHAP format
        sv_array = np.asarray(shap_values)

        if sv_array.ndim == 3:

            # shape:
            # (samples, features, classes)

            sv = sv_array[0, :, 1]

        elif sv_array.ndim == 2:

            # shape:
            # (samples, features)

            sv = sv_array[0]

        else:

            sv = sv_array.flatten()

    # Make sure SHAP values are 1-dimensional
    sv = np.asarray(sv).reshape(-1)

    # -----------------------------
    # FEATURES
    # -----------------------------

    feature_names = list(data.keys())
    feature_values = list(data.values())

    shap_explanation = []

    for i, fname in enumerate(feature_names):

        shap_explanation.append({
            "feature": FEATURE_LABELS.get(fname, fname),

            "value": feature_values[i],

            "shap": round(float(sv[i]), 4),

            "impact_pct": 0
        })

    # -----------------------------
    # IMPACT %
    # -----------------------------

    total_abs = sum(
        abs(e["shap"])
        for e in shap_explanation
    ) or 1

    for e in shap_explanation:

        e["impact_pct"] = round(
            abs(e["shap"]) / total_abs * 100,
            1
        )

    # -----------------------------
    # SORT
    # -----------------------------

    shap_explanation.sort(
        key=lambda x: abs(x["shap"]),
        reverse=True
    )

    # -----------------------------
    # RESPONSE
    # -----------------------------

    return {

        "prediction": prediction,

        "confidence": round(
            probability * 100,
            2
        ),

        "shap_explanation": shap_explanation
    }