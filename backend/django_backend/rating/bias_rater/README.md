## Model for making bias predictions
#### Returns a value between -1 and 1, with -1 being most left leaning, and 1 being most right leaning

#### Installing requirements
    pip install -r requirements.txt

#### Usage:
    from bias_rater import EnsembleRater

    data = load_data()
    
    clf = EnsembleRater()  
    clf.train(data)  
    clf.save_model('checkpoint/')  
    clf.load_model('checkpoint/')  
    predictions = clf.predict('Hello There')  

