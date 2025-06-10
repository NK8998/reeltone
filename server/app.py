from flask_cors import CORS
from flask import Flask, render_template
from api import bp as api_bp

app = Flask(__name__, template_folder='templates', static_folder='static')

# Enable CORS for all domains
CORS(app, resources={r"/*": {"origins": "*"}})
app.register_blueprint(api_bp)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=8888)
