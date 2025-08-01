from . import me_bp
from flask import jsonify
import tmdbsimple as tmdb
import os

def get_top_and_now_playing():
    """Fetch top-rated and now-playing movies from TMDB."""
    movies = tmdb.Movies()
    img_base_url = os.getenv("TMDB_IMAGE_BASE_URL") or "https://image.tmdb.org/t/p"

    def process_movie_list(movie_list):
        return [
            {
                "id": movie.get("id"),
                "title": movie.get("title"),
                "overview": movie.get("overview"),
                "poster_path": movie.get("poster_path"),
                "release_date": movie.get("release_date"),
                "vote_average": movie.get("vote_average"),
                "vote_count": movie.get("vote_count"),
                "popularity": movie.get("popularity"),
                "backdrop_path": movie.get("backdrop_path"),
                "poster_url": f"{img_base_url}/w500{movie.get('poster_path')}" if movie.get("poster_path") else None,
                "backdrop_url": f"{img_base_url}/w1280{movie.get('backdrop_path')}" if movie.get("backdrop_path") else None
            }
            for movie in movie_list
        ]

    top_rated = process_movie_list(movies.top_rated()['results'])[:7]
    now_playing = process_movie_list(movies.now_playing()['results'])[:7]

    return {
        "top_rated": top_rated,
        "now_playing": now_playing
    }

    
@me_bp.route("/films", methods=["GET"])
def films():
    try:
        film_data = get_top_and_now_playing()
        if not film_data:
            return jsonify({"message": "No films found"}), 404
        return jsonify(film_data), 200
    except Exception as e:
        print(f"An unexpected error occurred: {e}")
        return jsonify({"error": "An internal server error occurred"}), 500