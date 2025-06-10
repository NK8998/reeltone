from flask import jsonify, request
from . import landing_bp
import tmdbsimple as tmdb
import os

TMDB_API_KEY = os.environ.get("TMDB_API_KEY", "YOUR_TMDB_API_KEY_HERE")

tmdb.API_KEY = TMDB_API_KEY

@landing_bp.route("/all", methods=["GET"])
async def all_movies():
    try:
        search = tmdb.Search()
        response = search.movie(query='The Bourne')
        return jsonify({"films": response}), 200

    except tmdb.exceptions.TMDBException as e:
        # Handle TMDB API specific errors (e.g., invalid API key, rate limiting)
        print(f"TMDB API Error: {e}")
        return jsonify({"error": "Failed to fetch movies from TMDB", "details": str(e)}), 500
    except Exception as e:
        # Handle any other unexpected errors
        print(f"An unexpected error occurred: {e}")
        return jsonify({"error": "An internal server error occurred"}), 500