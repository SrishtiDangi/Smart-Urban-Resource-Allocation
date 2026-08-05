def recommend(priority):

    if priority == "Critical":

        return "Dispatch garbage truck immediately."

    elif priority == "High":

        return "Collect waste within 2 hours."

    elif priority == "Medium":

        return "Monitor the bin every hour."

    else:

        return "Normal collection schedule."