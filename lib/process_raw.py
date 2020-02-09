
# Cleans the raw data from JSON (raw_data.csv) and outputs final data (final_data.csv)

import numpy as np
import pandas as pd
import os

if not os.path.exists('../data/final_data.csv'):
    df = pd.read_csv("../data/raw_data.csv")
    reference = pd.read_csv("../data/Interactive Media Bias Chart - Ad Fontes Media.csv")

    # Performs left join
    final = df.merge(reference, how='left', on='Url')

    # Drops empty body
    cleaned_final = final.drop(final[final['Body'].isna()].index, axis=0)

    cleaned_final.to_csv('../data/final_data.csv', index=False)
else:
    print('file already exists!')