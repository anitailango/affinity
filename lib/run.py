
from utils import make_predictions
import pandas as pd
from sklearn.model_selection import train_test_split

if __name__ == "__main__":
    model = "../saved_models/model_v1.sav"
    features = "../saved_models/saved_features_v1.csv"
    data = "Testing data hello there, ability trump. bad ..! adwa"

    print(make_predictions(model, features, data))