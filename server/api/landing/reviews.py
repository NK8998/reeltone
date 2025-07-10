from flask import jsonify, request
from . import landing_bp
import tmdbsimple as tmdb
from pprint import pprint
import os


def get_reviews(film_id=None):
    """Fetch reviews for films from TMDB API. Return as a dictionary."""
    try:
        if not film_id:
            return {"error": "Film ID is required to fetch reviews"}
        
        img_base_url = os.getenv("TMDB_IMAGE_BASE_URL") or "https://image.tmdb.org/t/p"

        movies = tmdb.Movies(film_id)
        response = movies.reviews()   

        for review in response.get('results', []):
            review['author_details'] = {
                'name': review.get('author', 'Unknown'),
                'username': review.get('author_details', {}).get('username', 'Unknown'),
                'avatar_path': f"{img_base_url}/w500/{review.get('author_details', {}).get('avatar_path', None)}" if review.get('author_details', {}).get('avatar_path') else None,
                'rating': review.get('author_details', {}).get('rating', 0)
            }           

        return response

    except Exception as e:
        print(f"TMDB API Error: {e}")
        return {"error": "Failed to fetch trending film from TMDB", "details": str(e)}
    
@landing_bp.route("/films/reviews", methods=["GET"])
def reviews():
    """Endpoint to fetch reviews for films."""
    film_id = request.args.get("film_id")
    if not film_id:
        return jsonify({"error": "Film ID is required"}), 400
    
    try:
        reviews = get_reviews(film_id)
        return jsonify({"reviews": reviews}), 200
    except Exception as e:
        print(f"An error occurred while fetching reviews: {e}")
        return jsonify({"error": "Failed to fetch reviews", "details": str(e)}), 500