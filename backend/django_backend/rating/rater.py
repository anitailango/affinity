from newspaper import Article
from urllib.parse import urlparse
import newspaper
import pandas as pd
import pathlib

from .bias_rater import EnsembleRater

class Rater:
    ''' Wrapper class to serve data from rating model or CSV based on flag '''
    def __init__(self, affinity_model_flag = False):
        self.affinity_model_flag = affinity_model_flag
        self.rating = ''
        self.title = ''
        self.authors = ''
        self.publisher = ''

    def generate_rating(self, url):
        article = Article(url)
        article.download()
        article.parse()
        self.title = article.title
        self.authors = ', '.join(article.authors)
        print(type(self.authors))
        text = article.text
        if self.affinity_model_flag:
            # this is not implemented correctly
            clf = EnsembleRater()
            clf.load_model('checkpoint/')
            return clf.predict(text)
        else:
            ratings = pd.read_csv(str(pathlib.Path().absolute()) + '/rating/allsides_map_v3.csv')
            domain = urlparse(article.source_url).netloc
            row = ratings.loc[ratings['domain'].str.lower() == domain]
            self.publisher = row['allsides'].iloc[0]
            self.rating = row['rating'].iloc[0]
            return row['rating'].iloc[0]

