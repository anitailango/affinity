from flask import Flask, request
from diffbotScraper import diffbotScrape
from bias_rater import EnsembleRater
app = Flask(__name__)

@app.route('/')
def predict():
    url = request.args.get('url', '')
    res = diffbotScrape(url)
    print("scraped url")
    print(res)
    data = res["objects"][0]["text"]

    save_dir = 'checkpoint/'

    clf = EnsembleRater()
    clf.load_model(save_dir)

    return { "response": clf.predict(data)}
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
