import pandas as pd
import numpy as np
import os

def generate_iot_data(num_samples=5000):
    np.random.seed(42)
    
    # Generate Bins
    bin_ids = [f"BIN-{i:04d}" for i in range(1, 151)]  # 150 bins
    
    # Randomly assign base population density to each bin
    bin_populations = {bid: np.random.randint(500, 5000) for bid in bin_ids}
    
    data = []
    
    for _ in range(num_samples):
        bin_id = np.random.choice(bin_ids)
        population = bin_populations[bin_id]
        
        # Weather
        rainfall = np.random.exponential(scale=5) # Most days little rain, some days a lot
        temperature = np.random.normal(loc=25, scale=8) # Avg 25C, std 8C
        
        is_holiday = np.random.choice([0, 1], p=[0.9, 0.1])
        hours_since_last_collection = np.random.uniform(2, 48)
        previous_fill_percentage = np.random.uniform(0, 100)
        
        # Underlying logic for overflow probability (Hidden formula for ML to learn)
        # Higher pop -> more waste
        # High rain -> more waste (people stay in) or water logs bin
        # Holiday -> more waste
        # Long time since collection -> more waste
        # High previous fill -> more likely to overflow
        
        base_waste_rate = (population / 5000) * 5 # Base rate per hour
        holiday_multiplier = 1.5 if is_holiday else 1.0
        rain_multiplier = 1.0 + (rainfall / 50) # Heavy rain slightly increases
        
        waste_generated = base_waste_rate * hours_since_last_collection * holiday_multiplier * rain_multiplier
        
        # Convert previous fill to "amount already in bin" (assume 100kg capacity for all for simplicity)
        capacity = 100
        current_amount = (previous_fill_percentage / 100) * capacity
        
        final_amount = current_amount + waste_generated
        
        # Add some random noise
        final_amount += np.random.normal(0, 5)
        
        overflow_probability = min(max(final_amount / capacity, 0.0), 1.0)
        will_overflow = 1 if overflow_probability > 0.90 else 0
        
        data.append({
            "bin_id": bin_id,
            "population_nearby": population,
            "rainfall_mm": round(rainfall, 2),
            "temperature_c": round(temperature, 1),
            "is_holiday": is_holiday,
            "hours_since_last_collection": round(hours_since_last_collection, 1),
            "previous_fill_percentage": round(previous_fill_percentage, 1),
            "overflow_probability": round(overflow_probability, 3),
            "will_overflow": will_overflow
        })
        
    df = pd.DataFrame(data)
    
    os.makedirs(os.path.dirname(os.path.abspath(__file__)), exist_ok=True)
    csv_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "simulated_iot_data.csv")
    df.to_csv(csv_path, index=False)
    print(f"Generated {num_samples} samples at {csv_path}")
    return df

if __name__ == "__main__":
    generate_iot_data()
