import pandas as pd
import joblib

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import (
    accuracy_score,
    classification_report,
    confusion_matrix
)

# ==========================
# Load Dataset
# ==========================

df = pd.read_csv("../dataset/garbage_dataset.csv")

print("\n========== FIRST 5 ROWS ==========")
print(df.head())

print("\n========== DATA INFO ==========")
print(df.info())

print("\n========== STATISTICS ==========")
print(df.describe())

print("\n========== MISSING VALUES ==========")
print(df.isnull().sum())

print("\n========== OVERFLOW COUNT ==========")
print(df["overflow"].value_counts())

# ==========================
# Encode Categorical Column
# ==========================

encoder = LabelEncoder()
df["area"] = encoder.fit_transform(df["area"])

# ==========================
# Features & Target
# ==========================

X = df.drop("overflow", axis=1)
y = df["overflow"]

# ==========================
# Train Test Split
# ==========================

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)

# ==========================
# Train Model
# ==========================

model = RandomForestClassifier(
    n_estimators=100,
    random_state=42
)

model.fit(X_train, y_train)

# ==========================
# Prediction
# ==========================

predictions = model.predict(X_test)

# ==========================
# Evaluation
# ==========================

accuracy = accuracy_score(y_test, predictions)

print("\n========== MODEL ACCURACY ==========")
print(f"Accuracy: {accuracy:.4f}")

print("\n========== CLASSIFICATION REPORT ==========")
print(classification_report(y_test, predictions))

print("\n========== CONFUSION MATRIX ==========")
print(confusion_matrix(y_test, predictions))

# ==========================
# Feature Importance
# ==========================

importance = pd.DataFrame({
    "Feature": X.columns,
    "Importance": model.feature_importances_
})

print("\n========== FEATURE IMPORTANCE ==========")
print(importance.sort_values(by="Importance", ascending=False))

# ==========================
# Save Model
# ==========================

joblib.dump(model, "../models/overflow_model.pkl")

print("\n✅ Model Saved Successfully!")

# ==========================
# Load Saved Model
# ==========================

loaded_model = joblib.load("../models/overflow_model.pkl")

print("✅ Model Loaded Successfully!")

# ==========================
# Test Prediction
# ==========================

sample = X.iloc[[0]]

prediction = loaded_model.predict(sample)

print("\n========== SAMPLE PREDICTION ==========")
print("Prediction:", prediction[0])