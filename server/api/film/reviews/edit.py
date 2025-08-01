from .. import film_bp
from flask import request, jsonify
import sqlite3
import os
from datetime import datetime


def edit_review(user_id, review_id, new_content, rating):
    """Edit a review by a specific user."""
    script_dir = os.path.dirname(os.path.abspath(__file__))
    db_path = os.path.join(script_dir, '../../../db/reeltone.db')

    with sqlite3.connect(db_path) as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT id FROM reviews WHERE user_id = ? AND id = ?", (user_id, review_id))
        existing = cursor.fetchone()

        if existing:
            # User is the owner — update the review
            cursor.execute("""
                UPDATE reviews
                SET review_text = ?, updated_at = ?, rating = ?
                WHERE user_id = ? AND id = ?
            """, (new_content, datetime.now(), rating, user_id, review_id))
            conn.commit()
            data = {
                "id": review_id,
                "user_id": user_id,
                "review_text": new_content,
                "rating": rating,
                "updated_at": datetime.now().isoformat()
            }
            return {"message": "Review updated successfully.", "film_data": data}
        else:
            return {"message": "Review not found or user not authorized.", "film_data": {}}, 404


@film_bp.route('/reviews/edit', methods=['POST'])
def edit_review_route():
    """Endpoint to edit a review."""
    try:
        data = request.get_json()
        user_id = data.get("user_id")
        review_id = data.get("review_id")
        new_content = data.get("new_content")
        rating = data.get("rating")

        if not all([user_id, review_id, new_content, rating]):
            return jsonify({"error": "Missing user_id, review_id, new_content, or rating."}), 400

        message = edit_review(user_id, review_id, new_content, rating)

        return jsonify(message), 201

    except Exception as e:
        print(f"Error editing review: {e}")
        return jsonify({"error": "Failed to edit review.", "details": str(e)}), 500
