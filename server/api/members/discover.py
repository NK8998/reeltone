import sqlite3
import os
from . import members_bp
from flask import request, jsonify


def get_all_members(user_id=None):
    """
    Retrieves all members from the DB.
    If user_id is provided, adds an 'is_following' boolean field
    indicating whether that user follows each returned member.
    """
    script_dir = os.path.dirname(os.path.abspath(__file__))
    db_path = os.path.join(script_dir, '../../db/reeltone.db')

    with sqlite3.connect(db_path) as conn:
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()

        if user_id:
            cursor.execute("""
                SELECT 
                    m.*,
                    CASE WHEN f.id IS NOT NULL THEN 1 ELSE 0 END AS is_following
                FROM members m
                LEFT JOIN followers f
                    ON f.followed_id = m.user_id
                    AND f.follower_id = ?
            """, (user_id,))
        else:
            cursor.execute("SELECT *, 0 AS is_following FROM members")

        return [
            {**dict(row), "is_following": bool(row["is_following"])}
            for row in cursor.fetchall()
        ]



        
@members_bp.route('/discover', methods=['POST'])
def discover_members_route():
    """Endpoint to discover members."""
    try:

        members = get_all_members()
        return jsonify({"members": members}), 200
    
    except Exception as e:
        print(f"Error discovering members: {e}")
        return jsonify({"error": "Failed to discover members.", "details": str(e)}), 500