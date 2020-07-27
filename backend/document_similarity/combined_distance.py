from document_similarity import date_distance, text_distance


DISTANCE = {
    'Date': date_distance.distance,
    'Header': text_distance.distance,
    'Content': text_distance.distance
}

WEIGHTS = {
    'Date': 1,
    'Header': 100,
    'Content': 100,
}

def get_distance_function(cols):
    def distance(a, b):
        # a, b refers to one row of data from dataframe
        total = 0
        for i in range(len(cols)):
            if cols[i] in DISTANCE:
                total += WEIGHTS[cols[i]]/len(DISTANCE) * DISTANCE[cols[i]](a[i], b[i])
        return total
    return distance

            
