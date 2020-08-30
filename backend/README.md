## Web Scraper/ML Model API

This is the API endpoint that our Chrome extension can use to access our machine learning model/web scraper.

To setup the server:

- Navigate to this folder in Terminal
- Run the following commands:

  `python3 -m venv .env`

  `source .env/bin/activate`

  `pip install flask`

To run the server:

- Run the following commands in Terminal:

  `export FLASK_APP=server.py`

  `flask run`

- You should now see the following in your Terminal window (or something similar):

```
 * Serving Flask app "server.py"
 * Environment: production
   WARNING: This is a development server. Do not use it in a production deployment.
   Use a production WSGI server instead.
 * Debug mode: off
 * Running on http://127.0.0.1:5000/ (Press CTRL+C to quit)
```

- You can now navigate to `http://127.0.0.1:5000/` in Chrome to ensure that it is working
