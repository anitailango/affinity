
# This file contains functions that helps with NLP processing
from statistics import mean

# Natural Language Processing
### General
import nltk
nltk.download('stopwords')
from nltk.corpus import stopwords
nltk.download('wordnet')
from nltk.stem.wordnet import WordNetLemmatizer
import string

### Sentiment Analysis
import nltk
nltk.download('vader_lexicon')
from nltk.sentiment.vader import SentimentIntensityAnalyzer

### Part of Speech Tagging
import spacy
nlp = spacy.load('en_core_web_sm')

def get_sentiment(text):
    # gets the compound score of the sentiment using the VADER lexicon
    sid = SentimentIntensityAnalyzer()
    
    results = sid.polarity_scores(text)
    sentiment = results['compound']
    return sentiment

def get_entities(text):
    # gets the entities from the sentence and returns a list of them
    doc = nlp(text)
    return list(doc.ents)

def extract_sentences(word, text):
    # extract all sentences in text in which word appears
    sentences = [sentence for sentence in text.split('.') if word in sentence]
    return sentences

def extract_get_sentiment(word, text):
    # returns aggregate of sentiment for all sentences that contains word in text
    text = text.lower()
    word = word.lower()
    
    sentiments = [get_sentiment(sentence) for sentence in extract_sentences(word, text)]
    
    if len(sentiments) > 1:
        return mean(sentiments)
    return 0

def process_text(text):
    # 1. Lowercase text
    # 2. Removes punctuation
    # 3. Removes stopwords
    # 4. Lemmatizes remaining words

    text = text.lower()

    nopunc_digit = [char for char in text if char not in string.punctuation and not char.isdigit()]
    nopunc_digit = ''.join(nopunc_digit)

    wnl = WordNetLemmatizer()
    lemmatized = [wnl.lemmatize(word) for word in nopunc_digit.split() if not wnl.lemmatize(word) in set(stopwords.words('english'))]
    lemmatized = ' '.join(lemmatized)
    
    return lemmatized