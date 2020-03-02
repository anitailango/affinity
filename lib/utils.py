import numpy as np
import pandas as pd
import os

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.preprocessing import MinMaxScaler
import pickle

from model import setup_ensemble
from nlp_utils import process_text

########## FOR TRAINING MODEL ##########
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

    # Saving features
    filename = "../saved_models/saved_features_v1.csv"
    if not os.path.exists(filename):
        col_df = pd.DataFrame({'features':tfidf_transformer.get_feature_names()})
        col_df.to_csv(filename, index=False)
        print('Features successfully saved!')
    else:
        print('Features already exists! Try a different name.')

    # Splitting to X and y
    X = pd.DataFrame(tfidf.toarray(), columns=tfidf_transformer.get_feature_names())
    y = df['Category']

    col_names = X.columns
    scaler = MinMaxScaler()
    scaled = scaler.fit_transform(X)
    X = pd.DataFrame(scaled, columns=col_names)

    return X, y

def train_model(data):
    """
    Input: data to train on with predictors and response
    Output: trained model
    """
    # Preprocessing data
    X, y = preprocessing_pipeline(data)

    # Setting up model
    clf = setup_ensemble()

    # Fitting model
    clf = clf.fit(X, y)

    return clf

def save_model(model, filename):
    """
    save the model to disk
    """
    if not os.path.exists(filename):
        pickle.dump(model, open(filename, 'wb'))
        print('Model successfully saved!')
    else:
        print('Model already exists! Try a different name.')

########## FOR MAKING PREDICTIONS ##########
def load_model(filename):
    """
    load the model from a disk
    """
    loaded_model = pickle.load(open(filename, 'rb'))
    
    return loaded_model

def create_feature_cols(feature_list, data):
    """
    creates columns for data to predict to match model features
    Input: feature_list = list of features from saved model
           data = text in string format to be predicted
    Output: data in the form of bag-of-words with matching features
    """
    df = pd.DataFrame(columns=feature_list.tolist())
    counts = []
    for feature in feature_list:
        counts.append(data.split().count(feature))
        
    df.loc[0] = counts
        
    return df

def make_predictions(model, feature_csv, data_to_predict):
    """
    make predictions based on data
    Input:
        model: model to use (saved in /saved_models)
        feature_csv: csv of the features to use (saved in /saved_models)
        data_to_predict: text of article in string format
    
    Output: predictions in a list format (one number) ['2'] etc.
            range of predictions is from 1 - 3 (most left - most right)
    """
    clf = load_model(model)
    features = pd.read_csv(feature_csv)
    data = data_to_predict

    X_test = create_feature_cols(features['features'], data)

    # Makes predictions by multiplying the probability of each class by the class"
    class_probabilites = clf.predict_proba(X_test)[0]
    classes = [int(i) for i in clf.classes_]

    prediction = [a*b for a,b in zip(class_probabilites, classes)]

    return sum(prediction)

