import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, accuracy_score
import joblib
import os

def train_model():
    print("Loading dataset...")
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    dataset_path = os.path.join(base_dir, 'dataset', 'simulated_iot_data.csv')
    df = pd.read_csv(dataset_path)

    # Features and Target
    features = [
        'population_nearby', 
        'rainfall_mm', 
        'temperature_c', 
        'is_holiday', 
        'hours_since_last_collection', 
        'previous_fill_percentage'
    ]
    
    X = df[features]
    y = df['will_overflow']

    print("Splitting data...")
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    print("Training Random Forest Classifier...")
    model = RandomForestClassifier(n_estimators=100, max_depth=10, random_state=42)
    model.fit(X_train, y_train)

    print("Evaluating Model...")
    preds = model.predict(X_test)
    print("Accuracy:", accuracy_score(y_test, preds))
    print(classification_report(y_test, preds))

    # Save the model
    backend_models_dir = os.path.join(os.path.dirname(base_dir), 'backend', 'models')
    os.makedirs(backend_models_dir, exist_ok=True)
    model_path = os.path.join(backend_models_dir, 'rf_model.pkl')
    
    joblib.dump(model, model_path)
    
    columns_path = os.path.join(backend_models_dir, 'model_columns.pkl')
    joblib.dump(features, columns_path)
    
    print(f"Model saved to {model_path}")
    print("Training complete!")

if __name__ == '__main__':
    train_model()