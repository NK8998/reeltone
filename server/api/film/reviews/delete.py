from .. import film_bp
from flask import request, jsonify
import sqlite3
import os
from datetime import datetime
from ...util.db_helper import check_is_admin


def delete_review(user_id, review_id, is_admin=False):
    """Deletes a review by a specific user."""
    script_dir = os.path.dirname(os.path.abspath(__file__))
    db_path = os.path.join(script_dir, '../../../db/reeltone.db')

    if not is_admin:
        with sqlite3.connect(db_path) as conn:
            cursor = conn.cursor()
            cursor.execute("SELECT id FROM reviews WHERE user_id = ? AND id = ?", (user_id, review_id))
            existing = cursor.fetchone()

            if existing:
                cursor.execute("DELETE FROM reviews WHERE user_id = ? AND id = ?", (user_id, review_id))
                conn.commit()
                return {"message": "Review deleted."}
            else:
                return {"message": "Review not found."}
    else:
        with sqlite3.connect(db_path) as conn:
            cursor = conn.cursor()
            cursor.execute("SELECT id FROM reviews WHERE id = ?", (review_id,))
            existing = cursor.fetchone()
            if not existing:
                return {"message": "Review not found."}
            else:
                cursor.execute("DELETE FROM reviews WHERE id = ?", (review_id,))
                conn.commit()
                return {"message": "Review deleted by admin."}

@film_bp.route('/reviews/delete', methods=['POST'])
def delete_review_route():
    """Endpoint to delete a review."""
    try:
        data = request.get_json()
        user_id = data.get("user_id")
        review_id = data.get("review_id")
        is_admin = check_is_admin(user_id)  

        if not all([user_id, review_id]):
            return jsonify({"error": "Missing user_id or review_id."}), 400

        message = delete_review(user_id, review_id, is_admin)

        return jsonify({"message": message}), 201

    except Exception as e:
        print(f"Error deleting review: {e}")
        return jsonify({"error": "Failed to delete review.", "details": str(e)}), 500
