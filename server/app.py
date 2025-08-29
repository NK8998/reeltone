from flask_cors import CORS
from flask import Flask
from api import api_bp
import os
import tmdbsimple as tmdb
from werkzeug.middleware.proxy_fix import ProxyFix

app = Flask(__name__)

TMDB_API_KEY = os.environ.get("TMDB_API_KEY", "YOUR_TMDB_API_KEY_HERE")
tmdb.API_KEY = TMDB_API_KEY

CORS(app, resources={r"/*": {"origins": ["https://reeltone.streamgrid.site", "https://www.reeltone.streamgrid.site"]}})

# Register blueprints
app.register_blueprint(api_bp)

for rule in app.url_map.iter_rules():
    print(f"{rule.methods} -> {rule.rule}")

app.wsgi_app = ProxyFix(app.wsgi_app, x_proto=1, x_host=1)


if __name__ == '__main__':
    app.run()
