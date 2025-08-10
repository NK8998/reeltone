from flask_cors import CORS
from flask import Flask
from api import api_bp
import os
import tmdbsimple as tmdb
from werkzeug.middleware.proxy_fix import ProxyFix

# Import the new blueprint
from community_api import community_bp

app = Flask(__name__)

# Load TMDB API key from environment variable or use a default value
TMDB_API_KEY = os.environ.get("TMDB_API_KEY", "YOUR_TMDB_API_KEY_HERE")
tmdb.API_KEY = TMDB_API_KEY

# Enable CORS for all domains
CORS(app, resources={r"/*": {"origins": "*"}})

# Register your existing blueprint
app.register_blueprint(api_bp)

# Register the new community blueprint
app.register_blueprint(community_bp)

for rule in app.url_map.iter_rules():
    print(f"{rule.methods} -> {rule.rule}")

app.wsgi_app = ProxyFix(app.wsgi_app, x_proto=1, x_host=1)


if __name__ == '__main__':
    app.run()
