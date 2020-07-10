import os
import pickle
import pandas as pd

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.preprocessing import MinMaxScaler

from ..ensemble.model import setup_ensemble
from ..preprocessing import process_text

class EnsembleRater:
    def __init__(self):
        self.model = None
        self.features = None
        self.scaler = None


    def preprocess(self, data, max_features=800):
        """
            Input:
            - data: cleaned training data in dataframe format; has to contain columns 'Bias' and 'cleaned_body'
            - max_features: maximum tokens to use for BoW model
            Return:
            - X: predictor data in dataframe format
            - y: response data in numpy array
        """
        # 1 represents most left, 3 represents most right
        bins = [-41, -5, 5, 41]
        names = ['1', '2', '3']

        # Converting to categorical variables 
        data['Category'] = pd.cut(data['Bias'], bins, labels=names)

        # Converting to bag of words
        tfidf_transformer = TfidfVectorizer(max_features=max_features)
        tfidf = tfidf_transformer.fit_transform(data['cleaned_body'])

        self.features = tfidf_transformer.get_feature_names()

        # Splitting to X and y
        X = pd.DataFrame(tfidf.toarray(), columns=self.features)
        y = data['Category']

        col_names = X.columns
        scaler = MinMaxScaler()
        scaled = scaler.fit_transform(X)
        self.scaler = scaler
        X = pd.DataFrame(scaled, columns=col_names)

        return X, y


    def train(self, data):
        """
            Input:
            - data: cleaned training data in dataframe format; has to contain columns 'Bias' and 'cleaned_body'
        """
        X, y = self.preprocess(data)
        self.model = setup_ensemble().fit(X, y)

    
    def save_model(self, save_dir):
        """
            Input:
            - save_dir = directory to save model parameters
        """
        if not os.path.exists(save_dir):
            os.mkdir(save_dir)

        pickle.dump(self.model, open(f'{save_dir}model.sav', 'wb'))
        pickle.dump(self.scaler, open(f'{save_dir}scaler.sav', 'wb'))
        pickle.dump(self.features, open(f'{save_dir}features.sav', 'wb'))

        print('Model successfully saved!')
        
    
    def load_model(self, save_dir):
        """
            Input:
            - save_dir = directory where model parameters are saved
        """
        if not os.path.exists(save_dir):
            raise RuntimeError('Error: Model does not exist in directory!')

        self.model = pickle.load(open(f'{save_dir}model.sav', 'rb'))
        self.scaler = pickle.load(open(f'{save_dir}scaler.sav', 'rb'))
        self.features = pickle.load(open(f'{save_dir}features.sav', 'rb'))

        print('Model successfully loaded!')
        

    def create_feature_cols(self, text):
        """
            Input:
            - text: text in string format to be predicted
            Return: 
            - data in the form of bag-of-words with matching features for 1 row
        """
        data = pd.DataFrame(columns=self.features)
        counts = []
        for feature in self.features:
            counts.append(text.split().count(feature))
            
        data.loc[0] = counts
        return data


    def predict(self, X):
        """
            Input:
            - X: text of article in string format
            Returns:
            - Float of the predicted bias value from -1.0 to 1.0
        """
        if not all([self.model, self.scaler, self.features]):
            raise RuntimeError('Model is not trained!')
        
        cleaned_text = process_text(X)
        X = self.create_feature_cols(cleaned_text)
        
        # Scaling data
        scaled = self.scaler.transform(X)
        X_test = pd.DataFrame(scaled, columns=self.features)

        # Makes predictions by multiplying the probability of each class by the class"
        class_probabilites = self.model.predict_proba(X_test)[0]
        classes = [int(i) for i in self.model.classes_]
        prediction = [a*b for a,b in zip(class_probabilites, classes)]

        return sum(prediction) - 2

    


    