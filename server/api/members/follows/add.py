from .. import members_bp
from flask import request, jsonify
import sqlite3
import os

def add_following(follower_id, followed_id):
    """Adds a following relationship between two users."""
    script_dir = os.path.dirname(os.path.abspath(__file__))
    db_path = os.path.join(script_dir, '../../../db/reeltone.db')
    with sqlite3.connect(db_path) as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT id FROM followers WHERE follower_id = ? AND followed_id = ?", (follower_id, followed_id))
        existing = cursor.fetchone()
        if not existing:
            cursor.execute("""
                INSERT INTO followers (follower_id, followed_id)
                VALUES (?, ?)
            """, (follower_id, followed_id))
            conn.commit()
            return {"message": "Following relationship added."}
        
        else:
            # Remove the following relationship if it already exists
            cursor.execute("DELETE FROM followers WHERE follower_id = ? AND followed_id = ?", (follower_id, followed_id))
            conn.commit()
            return {"message": "Unfollowed user."}


@members_bp.route('/follows/add', methods=['POST'])
def add_following_route():
    """Endpoint to add a following relationship."""
    try:
        data = request.get_json()
        follower_id = data.get("follower_id")
        followed_id = data.get("followed_id")

        if not follower_id or not followed_id:
            return jsonify({"error": "Missing follower_id or followed_id."}), 400

        add_following(follower_id, followed_id)
        return jsonify({"message": "Following relationship added."}), 201

    except Exception as e:
        print(f"Error adding following relationship: {e}")
        return jsonify({"error": "Failed to add following relationship.", "details": str(e)}), 500