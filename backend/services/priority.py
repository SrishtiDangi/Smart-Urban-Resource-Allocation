def get_priority(confidence):

    if confidence >= 90:
        return "Critical"

    elif confidence >= 75:
        return "High"

    elif confidence >= 55:
        return "Medium"

    else:
        return "Low"