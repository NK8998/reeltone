from . import me_bp
from flask import jsonify, request
import sqlite3
import os

import os
import sqlite3

def get_reviews():
    """Fetch top 30 reviews with highest like count from the database."""

    script_dir = os.path.dirname(os.path.abspath(__file__))
    db_path = os.path.join(script_dir, '../../db/reeltone.db')

    with sqlite3.connect(db_path) as conn:
        conn.row_factory = sqlite3.Row  # Access rows as dictionaries
        cursor = conn.cursor()

        query = """
            SELECT 
                id,
                user_id,
                username,
                pfp_url,
                film_id,
                film_title,
                film_poster,
                rating,
                review_text,
                is_parent,
                parent_id,
                like_count,
                created_at,
                updated_at
            FROM reviews
            ORDER BY like_count DESC
            LIMIT 30
        """
        cursor.execute(query)
        rows = cursor.fetchall()

        if not rows:
            return []

        reviews = []
        for row in rows:
            review = {
                "id": row["id"],
                "user_id": row["user_id"],
                "username": row["username"],
                "pfp_url": row["pfp_url"],
                "film_id": row["film_id"],
                "film_title": row["film_title"],
                "film_poster": row["film_poster"],
                "rating": row["rating"],
                "review_text": row["review_text"],
                "is_parent": bool(row["is_parent"]),
                "parent_id": row["parent_id"],
                "like_count": row["like_count"],
                "created_at": row["created_at"],
                "updated_at": row["updated_at"]
            }
            reviews.append(review)

        return reviews

@me_bp.route("/reviews", methods=["GET"])
def reviews():
    try:
        reviews = get_reviews()
        if not reviews:
            return jsonify({"message": "No reviews found"}), 404
        return jsonify({"reviews": reviews}), 200
    except Exception as e:
        print(f"An unexpected error occurred: {e}")
        return jsonify({"error": "An internal server error occurred"}), 500