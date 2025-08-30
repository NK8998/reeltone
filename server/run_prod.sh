#!/bin/bash
# Run production container with baked-in environment
ENV_FILE="/home/$USER/.env"

echo "Running production container..."
sudo docker run -d \
  -p 127.0.0.1:8888:8888 \
  --env-file "$ENV_FILE" \
  -e APP_ENV=production \
  -e FLASK_ENV=production \
  --name reeltone-server \
  reeltone-server \
  gunicorn -w 4 -b 0.0.0.0:8888 app:app
