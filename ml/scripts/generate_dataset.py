import random
import pandas as pd
import os

# Reproducible results
random.seed(42)

# 20 city wards
wards = [f"Ward-{i}" for i in range(1, 21)]

data = []

for _ in range(5000):

    area = random.choice(wards)

    population = random.randint(2000, 12000)

    temperature = round(random.uniform(18, 45), 1)

    rainfall = round(random.uniform(0, 40), 1)

    holiday = random.randint(0, 1)

    last_collection_hours = random.randint(1, 30)

    # Waste depends on population
    waste_generated_kg = (
        population * random.uniform(0.03, 0.06)
    ) + random.uniform(-20, 20)

    waste_generated_kg = round(waste_generated_kg, 2)

    # Overflow score
    score = 0

    if waste_generated_kg > 350:
        score += 2

    if last_collection_hours > 20:
        score += 2

    if holiday == 1:
        score += 1

    if rainfall > 20:
        score += 1

    if population > 9000:
        score += 1

    overflow = 1 if score >= 4 else 0

    data.append([
        area,
        population,
        temperature,
        rainfall,
        holiday,
        last_collection_hours,
        waste_generated_kg,
        overflow
    ])

df = pd.DataFrame(data, columns=[
    "area",
    "population",
    "temperature",
    "rainfall",
    "holiday",
    "last_collection_hours",
    "waste_generated_kg",
    "overflow"
])

# Create dataset folder if missing
os.makedirs("../dataset", exist_ok=True)

# Save CSV
df.to_csv("../dataset/garbage_dataset.csv", index=False)

print("✅ Dataset generated successfully!")
print(df.head())
print(f"\nRows: {len(df)}")