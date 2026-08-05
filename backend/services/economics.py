def calculate_savings(prediction):

    if prediction == 1:

        fuel_saved = 4.5
        money_saved = fuel_saved * 105
        co2_saved = fuel_saved * 2.31

    else:

        fuel_saved = 0
        money_saved = 0
        co2_saved = 0

    return {

        "fuel_saved": round(fuel_saved,2),

        "money_saved": round(money_saved,2),

        "co2_saved": round(co2_saved,2)

    }