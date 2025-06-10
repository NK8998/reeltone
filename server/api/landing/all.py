from flask import jsonify, request
from . import landing_bp
import tmdb3
import os

TMDB_API_KEY = os.environ.get("TMDB_API_KEY", "YOUR_TMDB_API_KEY_HERE")

tmdb3.set_key(TMDB_API_KEY)

@landing_bp.route("/all", methods=["GET"])
async def all_movies():
    """
    Fetches a list of popular movies from TMDB and returns them as JSON.
    Supports optional 'page' and 'query' parameters for pagination and searching.
    """
    page = request.args.get('page', 1, type=int) 
    search_query = request.args.get('query', type=str) 
    try:
        if search_query:
            # Search for movies based on the query
            tmdb_results = tmdb3.Movie.search(search_query, page=page)
            print(f"Searching for '{search_query}', page {page}. Found {len(tmdb_results)} results.")
        else:
            # Get popular movies if no search query is provided
            tmdb_results = tmdb3.Movie.popular(page=page)
            print(f"Fetching popular movies, page {page}. Found {len(tmdb_results)} results.")

        films_data = []
        for movie in tmdb_results:
            films_data.append({
                "id": movie.id,
                "title": movie.title,
                "release_date": movie.release_date.strftime("%Y-%m-%d") if movie.release_date else None,
                "overview": movie.overview,
                "poster_path": f"https://image.tmdb.org/t/p/w500/{movie.poster_path}" if movie.poster_path else None,
                "vote_average": movie.vote_average,
            })

        return jsonify({"films": films_data}), 200

    except tmdb3.exceptions.TMDBException as e:
        # Handle TMDB API specific errors (e.g., invalid API key, rate limiting)
        print(f"TMDB API Error: {e}")
        return jsonify({"error": "Failed to fetch movies from TMDB", "details": str(e)}), 500
    except Exception as e:
        # Handle any other unexpected errors
        print(f"An unexpected error occurred: {e}")
        return jsonify({"error": "An internal server error occurred"}), 500