#!/usr/bin/env python
# coding: utf-8

# In[1]:


from bs4 import BeautifulSoup
import requests
import re
import json
import pandas as pd
import numpy as np


# In[2]:


url='https://mediabiasfactcheck.com/filtered-search/'
response = requests.get(url)
soup = BeautifulSoup(response.content, "html.parser")


# In[3]:


#content.find(text='getData()')
scripts = soup.find_all('script')
data = scripts[34] #34 is script that includes the JSON file that we want


# In[4]:


for elem in soup(text=re.compile("function getData()")):
    data = elem.split("current_json = ", 2)
    data = data[2].split("updateFilters()")
    data = data[0].split(";")
jsondata = data[0] #data[0] contains the json file we are looking for 


# In[5]:


result = json.loads(json.dumps(jsondata))
df = pd.DataFrame.from_dict(eval(result), orient='index') #have to do eval(result) because in this case, result isn't the dictionary itself, it's a string representation of a dictionary – eval makes it into dictionary form 
df.head(15)


# In[6]:


df = df.rename(columns={"b": "Bias", "d": "URL", "h": "Full URL", "L": "References", "n": 
                        "Name", "r": "Factualness", "u": "MBFC analysis", "c": "Country"})
df.head()


# In[7]:


print (df['Bias'].unique()) #looking at all the different bias labels


# In[8]:


#numerical value for each bias 
bias_dictionary = {"Left": -7, "Left-Center": -3.5, "Least Biased": 0, "Right-Center": 3.5, "Right": 7, 
                  "Questionable Sources": None, "Conspiracy-Pseudoscience": None, "Satire": None, "Pro-Science": None}
df['Bias Rating'] = df['Bias'].map(bias_dictionary)


# In[9]:


final_data = pd.read_csv('../data/final_data.csv')
#final_data['Source'].unique()


# In[10]:


#temporarily commented out code for all sources in scraped data

#for name in df['Name'].unique():
    #print(name)


# In[11]:


#find all the sources that are named differently in the final data
unique_sources = final_data[final_data['Source'].isin(df['Name'].unique()) == False]['Source'].unique()
unique_sources


# In[12]:


#change those names to match (this is a temporary solution)
'''
df.replace({'Name': {'ABC News': 'ABC', 'Associated Press': 'AP', 'BBC News': 'BBC', 'Buzzfeed': 'BuzzFeed',
                    'CBS News': 'CBS',
                    'CNS News': 'CNSNews',
                    'CounterPunch': "Counterpunch",
                     '': 'Daily Kos'
                                                                        
                   
                    }}).head(40)
'''
df = df.replace({'Name': {'ABC News': unique_sources[0],
    'Associated Press': unique_sources[1], 
    'BBC News': unique_sources[2],
    'Buzzfeed': unique_sources[3],
    'CBS News': unique_sources[4],
    'CNS News': unique_sources[5],
    'CounterPunch': unique_sources[6],
    'The Daily Wire': unique_sources[8],
    'Economic Policy Institute': unique_sources[9],
    'Financal Times': unique_sources[10],
    'Fortune Magazine': unique_sources[11],
    'The Forward': unique_sources[12],
    'FSTv (Freespeech.org)': unique_sources[13],
    'Independent Journal Review': unique_sources[14],
    'Infowars': unique_sources[15],
    'The Intercept': unique_sources[16],
    'MarketWatch': unique_sources[17],
    'NPR': unique_sources[18],
    'News Punch': unique_sources[19],
    'Newsmax': unique_sources[20],
    'Ozy Media': unique_sources[21],
    'Patribotics Blog': unique_sources[22],
    'PBS News Hour': unique_sources[23],
    'The Progressive': unique_sources[24],
    'Propublica': unique_sources[25],
    'RedStateWave': unique_sources[26],
    'Atlantic': unique_sources[27],
    'New Yorker': unique_sources[28],
    'Time Magazine': unique_sources[29],
    'TruthOut': unique_sources[31],
    'Vice News': unique_sources[32],                   
}})

#wtf no washington post? no washington examiner? no washington ANYTHING? need to add suspiciously missing sources into the data


# In[13]:


#ok so as it turns out, the scraped webpage doesn't have sources past "War on the Rocks" alphabetically
#got to find some way of amending that


# In[14]:


name_and_bias = pd.concat([df['Name'], df['Bias Rating']], axis=1)
#rename columns for merging purposes
name_and_bias = name_and_bias.rename(columns={'Name': 'Source'})
name_and_bias.head()


# In[15]:


final_data.head(50)


# In[16]:


#merge the two dataframes
final_data = pd.merge(final_data, name_and_bias, on='Source', how='inner') 
#final_data


# In[17]:


#final_data.loc[final_data['Bias Rating'].isna()]


# In[21]:


#cleaning out data without bias rating
#final_data = final_data.dropna(subset=['Bias Rating'])


# In[25]:


#REQUIRES the name "Source" for the source
#drops Na's for bias ratings (since not all have an easy rating to access)
def merge_ratings(final_data):
    final_data = pd.merge(final_data, name_and_bias, on='Source', how='inner') 
    final_data = final_data.dropna(subset=['Bias Rating'])
    return final_data

