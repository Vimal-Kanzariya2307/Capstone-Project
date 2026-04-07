from flask import Flask, request, jsonify
from flask_cors import CORS
from backend.services.market_data_service import fetch_stock_data
import requests



app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return "Stock Analysis API is running 🚀"
    


@app.route('/api/stock-details', methods=['GET'])
def stock_details():

    symbol = request.args.get('symbol')

    if not symbol:
        return jsonify({"error": "Symbol is required"}), 400

    result = fetch_stock_data(symbol.upper())

    if result is None:
        return jsonify({"error": "Stock not found"}), 404

    return jsonify(result)

import requests
from flask import request, jsonify

@app.route("/api/search-stocks")
def search_stocks():
    query = request.args.get("q")

    if not query:
        return jsonify([])

    try:
        url = "https://query2.finance.yahoo.com/v1/finance/search"

        headers = {
            "User-Agent": "Mozilla/5.0"
        }

        params = {
            "q": query,
            "quotesCount": 10,
            "newsCount": 0
        }

        response = requests.get(url, headers=headers, params=params)

        data = response.json()

        quotes = data.get("quotes", [])

        suggestions = []

        for item in quotes:
            if "symbol" in item and "shortname" in item:
                suggestions.append({
                    "symbol": item["symbol"],
                    "name": item["shortname"]
                })

        return jsonify(suggestions)

    except Exception as e:
        return jsonify({"error": str(e)})



if __name__ == "__main__":
    app.run(debug=True)
