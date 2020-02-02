# Processing
import numpy as np
import pandas as pd

# Scraping
import bs4
import urllib
from urllib.request import urlopen as uReq
from bs4 import BeautifulSoup as soup

# df = pd.read_csv("Interactive Media Bias Chart - Ad Fontes Media.csv")

# Function definition
def scrape_header(my_url):
    #print("Scraping URL no. ", df.index[df['Url'] == my_url][0])
    try:
        uClient = uReq(my_url) # this will download the webpage
        page_html = uClient.read() # this will dump out the content and store it in something else
        uClient.close() # closes the client (after you are done)

        page_soup = soup(page_html, "html.parser")
        header = page_soup.h1.text

        return header

    except urllib.error.HTTPError:
        return None

    except:
        return None

def scrape_body(my_url):
    try:
        uClient = uReq(my_url) # this will download the webpage
        page_html = uClient.read() # this will dump out the content and store it in something else
        uClient.close() # closes the client (after you are done)

        page_soup = soup(page_html, "html.parser")
        body = page_soup.findAll("p")

        # Concatenating paragraphs into one chunk of text
        paragraph_list = []
        for paragraph in body:
            paragraph_list.append(paragraph.text.strip())

        return ' '.join(paragraph_list)

    except urllib.error.HTTPError:
        return('HTTPError')

    # except:
    #     return None

    except Exception as ex:
        return(type(ex).__name__)

# Scraping data
# df['Header'] = df['Url'].apply(scrape_header)
# df['Body'] = df['Url'].apply(scrape_body)

# Writing to CSV
# print('Writing to CSV')
# df.to_csv(r'C:\Users\quort\Documents\GitHub\affinity\scraped_data.csv')
