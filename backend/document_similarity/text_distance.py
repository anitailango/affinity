from nltk import word_tokenize
from nltk.util import ngrams
from sklearn.feature_extraction import FeatureHasher
from collections import Counter
from scipy import spatial

N = 2

class TextDistance:
    def __init__(self, N):
        self.N = N

    def extract_ngrams(self, text):
        n_grams = ngrams(word_tokenize(text), self.N)
        return [' '.join(grams) for grams in n_grams]

    def hash_text(self, text):
        grams = self.extract_ngrams(text)
        gram_counts = []
        gram_counts.append(Counter(grams))

        hasher = FeatureHasher()
        hashed = hasher.transform(gram_counts).toarray()[0]
        return hashed

    def get_similarity(self, text1, text2):
        hashed1 = self.hash_text(text1)
        hashed2 = self.hash_text(text2)
        return 1 - spatial.distance.cosine(hashed1, hashed2)

def distance(text1, text2):
    dist = TextDistance(N)
    return dist.get_similarity(text1, text2)