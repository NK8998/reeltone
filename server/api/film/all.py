from . import film_bp
from flask import jsonify, request
from .essential.essential import get_essential_data
from .reviews.get import get_reviews_by_film_id
from .extra.related import get_related_films
import sqlite3
import os


def record_exists(table, user_id, film_id):
    """Generic checker for (user_id, film_id) existence in a table."""
    script_dir = os.path.dirname(os.path.abspath(__file__))
    db_path = os.path.join(script_dir, '../../db/reeltone.db')

    with sqlite3.connect(db_path) as conn:
        cursor = conn.cursor()
        cursor.execute(
            f"SELECT 1 FROM {table} WHERE user_id = ? AND film_id = ? LIMIT 1", 
            (user_id, film_id)
        )
        return cursor.fetchone() is not None

@film_bp.route('/all', methods=['GET'])
def all_films():
    """Fetch all films from the database."""
    try:
        query = request.args.get('query')
        user_id = request.args.get('user_id')
        
        if not query:
            return jsonify({'error': 'query parameter is required'}), 400
    
        if user_id and not query:
            return jsonify({'error': 'query is required when user_id is provided'}), 400

        essential_data = get_essential_data(query)

        if essential_data is None:
            return jsonify({'error': 'Film not found'}), 404
        
        film_id = essential_data.get('id')
        if not film_id:
            return jsonify({'error': 'Film ID not found in the response'}), 404
        
        reviews = get_reviews_by_film_id(film_id)
        related_films = get_related_films(film_id)
        has_liked_film = record_exists("film_likes", user_id, film_id)
        has_film_in_watchlist = record_exists("watchlist", user_id, film_id)
        has_watched_film = record_exists("watched", user_id, film_id)

        
        return jsonify({
            'essential_data': essential_data,
            'reviews': reviews,
            'related_films': related_films,
            'user_flags': {
                'has_liked': has_liked_film,
                'in_watchlist': has_film_in_watchlist,
                'watched': has_watched_film
            }
        }), 200
    except ValueError:
        return jsonify({'error': 'Invalid query format'}), 400
    
