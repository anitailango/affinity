from flask import Flask, request
from diffbotScraper import diffbotScrape
from lib import utils
app = Flask(__name__)

@app.route('/')
def predict():
    url = request.args.get('url', '')
    res = diffbotScrape(url)
    print("scraped url")
    data = res["objects"][0]["text"]

    model = "./saved_models/model_v1.sav"
    features = "./saved_models/saved_features_v1.csv"

    return { "response": utils.make_predictions(model, features, data)}
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
