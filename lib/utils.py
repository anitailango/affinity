import numpy as np
import pandas as pd

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.preprocessing import MinMaxScaler

def load_data():
    """
    loads a dataframe with cleaned article bodies
    """
    data = pd.read_csv("../data/preprocessed_cleaned_body.csv")

    return data

def preprocessing_pipeline(df):
    """
    Input: cleaned dataframe
    Output: X, y split in bag-of-words format
    """
    # 1 represents most left, 3 represents most right
    bins = [-41, -5, 5, 41]
    names = ['1', '2', '3']

    # Converting to categorical variables 
    df['Category'] = pd.cut(df['Bias'], bins, labels=names)

    # Converting to bag of words
    tfidf_transformer = TfidfVectorizer(max_features = 800)
    tfidf = tfidf_transformer.fit_transform(df['cleaned_body'])

    # Splitting to X and y
    X = pd.DataFrame(tfidf.toarray(), columns=tfidf_transformer.get_feature_names())
    y = df['Category']

    col_names = X.columns
    scaler = MinMaxScaler()
    scaled = scaler.fit_transform(X)
    X = pd.DataFrame(scaled, columns=col_names)

    return X, y