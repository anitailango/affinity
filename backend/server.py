from flask import Flask, request
from diffbotScraper import diffbotScrape
from bias_rater import EnsembleRater
from newspaper import Article, build

app = Flask(__name__)


@app.route('/')
def predict():
    url = request.args.get('url', '')
    paper = build(url)
    article = Article(url)
    article.download()
    article.parse()
    # res = diffbotScrape(url)
    # print("scraped url")
    # data = res["objects"][0]["text"]
    data = article.text
    save_dir = 'checkpoint/'

    clf = EnsembleRater()
    clf.load_model(save_dir)
    rating = clf.predict(data)

    return {
        "authors": article.authors,
        "title": article.title,
        "publisher": paper.brand,
        "text": article.text,
        "rating": rating,
    }
    # return {
    #     "author": data["author"],
    #     "title": data["title"],
    #     "publisher": data["siteName"],
    #     "text": data["text"]
    # }


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
