
from utils import load_data, preprocessing_pipeline
from model import setup_ensemble

from sklearn.model_selection import train_test_split

if __name__ == "__main__":

    # Loading data
    data = load_data()

    # Preprocessing data
    X, y = preprocessing_pipeline(data)

    # Train test split
    X_train, X_test, y_train, y_test = train_test_split(X, y, random_state=3)

    # Setting up model
    clf = setup_ensemble()

    # Fitting model
    clf.fit(X_train, y_train)

