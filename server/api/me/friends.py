from . import me_bp
from flask import jsonify, request
import sqlite3
import os

def get_friends_activity(user_id):
    script_dir = os.path.dirname(os.path.abspath(__file__))
    db_path = os.path.join(script_dir, '../../db/reeltone.db')

    if not user_id:
        raise ValueError("User ID is required")
    
    with sqlite3.connect(db_path) as conn:
        conn.row_factory = sqlite3.Row  # ✅ access by column name
        cursor = conn.cursor()

        query = """
            SELECT reviews.*, followers.follower_id
            FROM reviews
            JOIN followers ON reviews.user_id = followers.follower_id
            WHERE followers.followed_id = ?
        """
        cursor.execute(query, (user_id,))
        rows = cursor.fetchall()

        if not rows:
            return []

        print(f"Rows fetched: {len(rows)}")

        friends_activity = []
        for row in rows:
            activity = {
                "id": row["id"],
                "user_id": row["user_id"],
                "username": row["username"],
                "pfp_url": row["pfp_url"],
                "film_id": row["film_id"],
                "film_title": row["film_title"],
                "film_poster": row["film_poster"],
                "rating": row["rating"],
                "review_text": row["review_text"],
                "is_parent": row["is_parent"],
                "parent_id": row["parent_id"],
                "like_count": row["like_count"],
                "created_at": row["created_at"],
                "updated_at": row["updated_at"],
                # Optional: include follower_id if needed for frontend
                # "follower_id": row["follower_id"]
            }
            friends_activity.append(activity)

        return friends_activity

    

@me_bp.route("/friends", methods=["GET"])
def friends():
    try:
        user_id = request.args.get("user_id")
        if not user_id:
            return jsonify({"error": "User ID is required"}), 400
        friends_activity = get_friends_activity(user_id)
        if not friends_activity:
            return jsonify({"message": "No friends activity found"}), 404
        return jsonify({"friends_activity": friends_activity}), 200
    except Exception as e:
        print(f"An unexpected error occurred: {e}")
        return jsonify({"error": "An internal server error occurred"}), 500