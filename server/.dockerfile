FROM python:3.11-slim

# Set working directory inside container
WORKDIR /app

# Install dependencies first for layer caching
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt gunicorn python-dotenv

# Copy the rest of the backend code
COPY . .

# Expose Flask/Gunicorn port
EXPOSE 8888

# Run using Gunicorn with 4 workers bound to port 8888
# "app:app" means app.py with variable app = Flask(__name__)
CMD ["gunicorn", "-w", "4", "-b", "0.0.0.0:8888", "app:app"]
