import os
from flask import Flask
from flask_cors import CORS
import tmdbsimple as tmdb
from werkzeug.middleware.proxy_fix import ProxyFix
from api import api_bp
from dotenv import load_dotenv
load_dotenv()

app = Flask(__name__)

ENV = os.environ.get("APP_ENV", "development").lower()
tmdb.API_KEY = os.environ.get("TMDB_API_KEY")
if not tmdb.API_KEY:
    raise RuntimeError("TMDB_API_KEY not set in environment")

if ENV == "development":
    CORS(app, resources={r"/*": {"origins": "*"}})
else:
    CORS(app, resources={r"/*": {"origins": [
        "https://reeltone.streamgrid.site",
        "https://www.reeltone.streamgrid.site"
    ]}})

app.register_blueprint(api_bp)
app.wsgi_app = ProxyFix(app.wsgi_app, x_proto=1, x_host=1)

if __name__ == "__main__":
    port = 5000 if ENV == "development" else 8888
    debug = ENV == "development"
    print(f"Starting app in {ENV} mode on port {port} (debug={debug})")
    app.run(host="0.0.0.0", port=port, debug=debug)
