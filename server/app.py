from flask_cors import CORS
from flask import Flask
from api import api_bp
import os
import tmdbsimple as tmdb

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

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=8888)
