from .. import film_bp
from flask import request, jsonify
import sqlite3
import os
from datetime import datetime


def edit_review(user_id, review_id, new_content):
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
                SET review_text = ?, updated_at = ?
                WHERE user_id = ? AND id = ?
            """, (new_content, datetime.now(), user_id, review_id))
            conn.commit()
            return {"message": "Review updated successfully."}
        else:
            return {"error": "Review not found or user not authorized."}, 404


@film_bp.route('/reviews/edit', methods=['POST'])
def edit_review_route():
    """Endpoint to edit a review."""
    try:
        data = request.get_json()
        user_id = data.get("user_id")
        review_id = data.get("review_id")
        new_content = data.get("new_content")

        if not all([user_id, review_id, new_content]):
            return jsonify({"error": "Missing user_id, review_id, or new_content."}), 400

        message = edit_review(user_id, review_id, new_content)

        return jsonify({"message": message}), 201

    except Exception as e:
        print(f"Error editing review: {e}")
        return jsonify({"error": "Failed to edit review.", "details": str(e)}), 500
