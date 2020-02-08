
# Converts merged_file.json in diffbotJSONs/ to csv
# Extracts:
#   1. 'author'
#   2. 'date'
#   3. 'text'
#   4. 'title'
#   5. number of links

import numpy as np
import pandas as pd
import json
import glob
import os

# Importing and combining JSON files (each file contains 50 rows)
os.chdir("../raw_data/diffbotJSONs/")
if not os.path.exists('merged_file.json'):
    result = []
    for f in sorted(glob.glob("*.json")):
        with open(f, "rb") as infile:
            result.append(json.load(infile))

    with open("merged_file.json", "w") as outfile:
         json.dump(result, outfile)
    
    print('merged JSON files')

with open("merged_file.json") as f:
    data = json.load(f)

# Extracting features from merged_file.json
authors = []
dates = []
texts = []
titles = []
n_links = []

for json_num in range(0, len(data)):
    url_list = data[json_num].keys()
    
    for url in url_list:
        print('json number: ', json_num, 'url: ', url)
        
        objects = data[json_num][url].get('objects')
        if objects != None:
            author = objects[0].get('author')
            date = objects[0].get('date')
            text = objects[0].get('text')
            title = objects[0].get('title')

            html = objects[0].get('html')
            if html != None:
                n_link = html.count("href=")
            else:
                n_link = None
                
            authors.append(author)
            dates.append(date)
            texts.append(text)
            titles.append(title)
            n_links.append(n_link)

# Converting to data frame
final = pd.DataFrame({'author': authors,
                      'date': dates,
                      'header': titles,
                      'body': texts,
                      'n_links': n_links
                     })

if not os.path.exists('./../data/raw_data.csv'):
    # Writing to CSV
    final.to_csv('../../data/raw_data.csv')
else:
    print('file already exists!')

