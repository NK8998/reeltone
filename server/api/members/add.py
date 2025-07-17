import sqlite3
import os
from . import members_bp
from flask import request, jsonify


def add_member(user_id, username, email, pfp_url):
    """Adds a member to the DB"""
    script_dir = os.path.dirname(os.path.abspath(__file__))
    db_path = os.path.join(script_dir, '../../../db/reeltone.db')

    with sqlite3.connect(db_path) as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT id FROM members WHERE user_id = ?", (user_id,))
        existing = cursor.fetchone()

        if not existing:
            # User doesn't exist — insert new member
            cursor.execute("""
                INSERT INTO members (user_id, username, email, pfp_url)
                VALUES (?, ?, ?, ?)
            """, (user_id, username, email, pfp_url))
            conn.commit()
            return {"message": "Member added."}
        else:
            # User already exists
            return {"message": "Member already exists."}
        
@members_bp.route('/add', methods=['POST'])
def add_member_route():
    """Endpoint to add a member."""
    try:
        data = request.get_json()
        user_id = data.get("user_id")
        username = data.get("username")
        email = data.get("email")
        pfp_url = data.get("pfp_url")

        if not all([user_id, username, email]):
            return jsonify({"error": "Missing user_id, username, or email."}), 400
        message = add_member(user_id, username, email, pfp_url)
    
        return jsonify({"message": message}), 201
    except Exception as e:
        print(f"Error adding member: {e}")
        return jsonify({"error": "Failed to add member.", "details": str(e)}), 500