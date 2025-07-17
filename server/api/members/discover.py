import sqlite3
import os
from . import members_bp
from flask import request, jsonify


def get_all_members():
    """Retrieves all members from the DB"""
    script_dir = os.path.dirname(os.path.abspath(__file__))
    db_path = os.path.join(script_dir, '../../../db/reeltone.db')

    with sqlite3.connect(db_path) as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM members")
        members = cursor.fetchall()
        return members
        
@members_bp.route('/discover', methods=['POST'])
def discover_members_route():
    """Endpoint to discover members."""
    try:
        
        members = get_all_members()
        return jsonify({"members": members}), 200
    
    except Exception as e:
        print(f"Error discovering members: {e}")
        return jsonify({"error": "Failed to discover members.", "details": str(e)}), 500