from . import members_bp
from flask import request, jsonify
from discover import get_all_members
from follows.followers import get_followers
from follows.following import get_following


@members_bp.route('/all', methods=['GET'])
def get_all_members_data():
    """Endpoint to get all members."""
    try:
        user_id = request.args.get("user_id")
        members = get_all_members()
        if user_id:
            followers = get_followers(user_id)
            following = get_following(user_id)

            return jsonify({
                "members": members,
                "followers": followers,
                "following": following
            }), 200

        return jsonify({
            "members": members,
            "followers": [],
            "following": []
        }), 200

    except Exception as e:
        print(f"Error getting all members data: {e}")
        return jsonify({"error": "Failed to get all members data.", "details": str(e)}), 500
