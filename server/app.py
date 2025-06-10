from flask_cors import CORS
from flask import Flask
from api import api_bp

app = Flask(__name__)

# Enable CORS for all domains
CORS(app, resources={r"/*": {"origins": "*"}})
app.register_blueprint(api_bp)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=8888)
