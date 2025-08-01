import sqlite3
import os
from .. import members_bp
from flask import request, jsonify


def get_followers(user_id):
    """Retrieves full member info for all users who follow the given user_id"""
    script_dir = os.path.dirname(os.path.abspath(__file__))
    db_path = os.path.join(script_dir, '../../../db/reeltone.db')

    with sqlite3.connect(db_path) as conn:
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()
        cursor.execute("""
            SELECT m.* 
            FROM followers f
            JOIN members AS m ON f.follower_id = m.user_id
            WHERE f.followed_id = ?
        """, (user_id,))
        return [dict(row) for row in cursor.fetchall()]



@members_bp.route('/follows/followers', methods=['POST'])
def followers_route():
    """Endpoint to get followers of a user."""
    try:
        data = request.get_json()
        user_id = data.get("user_id")

        if not user_id:
            return jsonify({"error": "Missing user_id."}), 400

        followers = get_followers(user_id)
        return jsonify({"followers": followers}), 200

    except Exception as e:
        print(f"Error getting followers: {e}")
        return jsonify({"error": "Failed to get followers.", "details": str(e)}), 500