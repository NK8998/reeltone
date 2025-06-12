from flask import jsonify, request
from . import landing_bp
import tmdbsimple as tmdb

def get_recent_films():
    """Fetch recent films from TMDB API. Return as a list of dictionaries."""
    movies = tmdb.Movies()
    response = movies.now_playing()

    # Extract relevant fields
    recent_films = []
    for movie in response['results']:
        recent_films.append({
            "id": movie.get("id"),
            "title": movie.get("title"),
            "overview": movie.get("overview"),
            "poster_path": f"https://image.tmdb.org/t/p/w500{movie.get('poster_path')}" if movie.get("poster_path") else None,
            "release_date": movie.get("release_date"),
            "vote_average": movie.get("vote_average"),
            "vote_count": movie.get("vote_count"),
        })

    return recent_films

@landing_bp.route("/films/recent", methods=["GET"])
def recent_films():
    try:
        films = get_recent_films()
        return jsonify({"recent_films": films}), 200
    except Exception as e:
        print(f"An error occurred while fetching recent films: {e}")
        return jsonify({"error": "Failed to fetch recent films", "details": str(e)}), 500
