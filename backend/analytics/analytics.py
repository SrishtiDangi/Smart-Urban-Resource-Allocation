import pandas as pd

# Load dataset once
df = pd.read_csv("../ml/dataset/garbage_dataset.csv")


def get_dashboard_stats():

    total_bins = len(df)

    overflow_bins = int(df["overflow"].sum())

    fuel_saved = round(overflow_bins * 1.25, 2)

    money_saved = round(fuel_saved * 95)

    return {
        "total_bins": total_bins,
        "overflow_bins": overflow_bins,
        "fuel_saved": fuel_saved,
        "money_saved": money_saved
    }


def get_waste_trend():

    waste = (
        df.groupby("day")["waste_generated_kg"]
        .mean()
        .round(2)
        .reset_index()
    )

    return {
        "days": waste["day"].tolist(),
        "waste": waste["waste_generated_kg"].tolist()
    }


def get_overflow_summary():

    overflow = int(df["overflow"].sum())

    normal = len(df) - overflow

    return {
        "overflow": overflow,
        "normal": normal
    }


def get_ward_status():

    wards = []

    grouped = df.groupby("area")

    for area, data in grouped:

        wards.append({

            "ward": area,

            "population": int(data["population"].mean()),

            "waste": round(data["waste_generated_kg"].mean(), 2),

            "overflow": "Yes" if data["overflow"].mean() >= 0.5 else "No"

        })

    return wards