import pandas as pd

import string
import nltk
nltk.download('stopwords')
from nltk.corpus import stopwords
nltk.download('wordnet')
from nltk.stem.wordnet import WordNetLemmatizer


def load_data(data_dir="data/preprocessed_cleaned_body.csv"):
    """
        loads a dataframe with cleaned article bodies
    """
    data = pd.read_csv(data_dir)

    return data

def process_text(text):
    """
        1. Lowercase text
        2. Removes punctuation
        3. Removes digits
        4. Removes stopwords
        5. Lemmatizes remaining words
    """

    text = text.lower()

    nopunc_digit = [char for char in text if char not in string.punctuation and not char.isdigit()]
    nopunc_digit = ''.join(nopunc_digit)

    wnl = WordNetLemmatizer()
    lemmatized = [wnl.lemmatize(word) for word in nopunc_digit.split() if not wnl.lemmatize(word) in set(stopwords.words('english'))]
    lemmatized = ' '.join(lemmatized)
    
    return lemmatized