from sklearn.naive_bayes import MultinomialNB
from sklearn.linear_model import LogisticRegression
from sklearn.svm import SVC
from sklearn.ensemble import VotingClassifier
from sklearn.ensemble import VotingRegressor

def setup_ensemble():
    """
    Returns an ensemble of 3 models (SVM, Naive Bayes, and Logistic Regression)
    """

    clf1 = SVC(probability=True)
    clf2 = MultinomialNB()
    clf3 = LogisticRegression()

    estimators = [
                  ('svm', clf1),
                  ('naivebayes', clf2), 
                  ('logistic', clf3)
                  ]

    ensemble = VotingClassifier(estimators, voting='soft')

    return ensemble


