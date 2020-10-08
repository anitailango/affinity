
# Extracts urls and writes each source URLS in a seperate text file

import numpy as np
import pandas as pd

df = pd.read_csv('../data/Interactive Media Bias Chart - Ad Fontes Media.csv')

sources = df['Source'].unique()

for source in sources:
    url_list = df[df['Source'] == source]['Url']
    
    filename = '../data/' + source + '_urls.txt'
    
    file = open(filename, 'w')
    for url in url_list:
        file.write(url)
        file.write('\n')
    file.close()
    
    print('finished writing urls for ', source)