from flask import Flask, request
from diffbotScraper import diffbotScrape
app = Flask(__name__)

@app.route('/')
def hello():
    return "Hello World!"

@app.route('/scrape')
def get_scraped_data():
    url = request.args.get('url', '')
    res = diffbotScrape(url)
    data = res["objects"][0]
    return {
        "author": data["author"],
        "title": data["title"],
        "publisher": data["siteName"],
        "text": data["text"]
    }
