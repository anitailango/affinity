import os
from bias_rater import EnsembleRater, load_data

def pipeline(data_dir, save_dir):
    data = load_data(data_dir)  

    clf = EnsembleRater()
    if not os.path.exists(save_dir):
        print('Training Model Now...')
        clf.train(data)  
        clf.save_model(save_dir)  
    print('Loading Existing Model...')
    clf.load_model(save_dir)  
    predictions = clf.predict('Hello there, Trump sucks and his policies are detrimental towards the United States')

    print(f'prediction: {predictions}')

if __name__ == "__main__":
    data_dir = 'data/preprocessed_cleaned_body.csv'
    save_dir = 'checkpoint/'
    pipeline(data_dir, save_dir)