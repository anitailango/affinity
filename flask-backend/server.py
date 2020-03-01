from flask import Flask, request
app = Flask(__name__)

@app.route('/')
def hello():
    return "Hello World!"

@app.route('/scrape')
def get_scraped_data():
    url = request.args.get('url', '')
    # Run web scraper
    return {
        "author": "Bob Roberts",
        "content": "hello world",
        "publisher": "publisher"
    }
