from datetime import datetime, timedelta

def distance(date1, date2):
    dt1 = datetime.strptime(date1, "%Y-%m-%d")
    dt2 = datetime.strptime(date2, "%Y-%m-%d")
    return abs(dt2 - dt1).days