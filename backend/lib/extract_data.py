
import sqlite3
import os
import numpy as np
import pandas as pd

def extract_data(datapath):
    os.chdir(datapath)
    
    conn = sqlite3.connect('articles.db')
    c = conn.cursor()

    #c.execute("CREATE TABLE news_labels (source, label);")

    # Printing Existing Tables
    c.execute("SELECT name FROM sqlite_master WHERE type='table';")
    print(c.fetchall())

    # Processing Labels
    labels_df = pd.read_csv("labels.csv")
    labels_df.reset_index(inplace=True)
    labels_df.rename(columns={'Unnamed: 0': "Source"}, inplace=True)
    labels_df = labels_df[["Source",
                           "Media Bias / Fact Check, label"]]
    labels_df.columns = ["source", "label"]

    # Moving Labels to SQL table
    labels_df.to_sql('news_labels', conn, if_exists='replace', index=False)
    #c.execute("SELECT * FROM news_labels LIMIT 1")
    #print(c.fetchall())

    # Joining tables
    c.execute("""
        SELECT articles.source, articles.content, news_labels.label
        FROM articles
        INNER JOIN news_labels ON articles.source=news_labels.source;
        """)

    # Output to dataframe
    final = pd.DataFrame(c.fetchall(), columns=['Source','Content','Label'])

    conn.close()

    print('Complete!')
    return final
