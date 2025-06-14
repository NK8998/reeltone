from .. import film_bp
from flask import jsonify, request
import sqlite3
import os

def get_reviews_by_film_id(film_id):
    """Fetch film reviews by ID from sqlite database."""
    script_dir = os.path.dirname(os.path.abspath(__file__))
    db_path = os.path.join(script_dir, '../../../db/reeltone.db')

    with sqlite3.connect(db_path) as conn:
        cursor = conn.cursor()
        query = """
        SELECT * FROM reviews
        WHERE film_id = ?
        ORDER BY created_at DESC LIMIT 30
        """
        cursor.execute(query, (film_id,))
        rows = cursor.fetchall()
        if not rows:
            return []
        reviews = []
        for row in rows:
            review = {
                "id": row[0],
                "user_id": row[1],
                "film_id": row[2],
                "content": row[3],
                "like_count": row[4],
                "created_at": row[5],
                "username": row[6],
                "profile_picture": row[7]
            }
            reviews.append(review)
        return reviews

@film_bp.route('/reviews', methods=['GET'])
def get_reviews():
    """Fetch film reviews by ID from sqlite database."""
    try:
        film_id = request.args.get('film_id')
        if not film_id:
            return jsonify({'error': 'film_id is required'}), 400
        reviews = get_reviews_by_film_id(film_id)
        if not reviews:
            return jsonify({'message': 'No reviews found for this film'}), 404
        return jsonify({'reviews': reviews}), 200
    except sqlite3.Error as e:
        print(f"Database error: {e}")
        return jsonify({'error': 'An error occurred while fetching reviews'}), 500
    except Exception as e:
        print(f"An unexpected error occurred: {e}")
        return jsonify({'error': 'An internal server error occurred'}), 500