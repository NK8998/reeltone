#!/bin/bash
# Run dev server with proper environment
export APP_ENV=development
export FLASK_ENV=development

echo "Starting Flask in development mode..."
python app.py
