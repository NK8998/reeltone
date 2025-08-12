from .content import get_user_content
from . import me_bp
from .friends import get_friends_activity
from .films import get_top_and_now_playing
from .reviews import get_reviews
from flask import request, jsonify

@me_bp.route("/all", methods=["GET"])
def all():
    try:
        """Endpoint to fetch all user-related data."""
        user_id = request.args.get("user_id")
        if not user_id:
            return {"error": "User ID is required"}, 400

        friends_activity = get_friends_activity(user_id=user_id)
        films = get_top_and_now_playing()
        user_content = get_user_content(user_id=user_id)
        top_rated = films["top_rated"]
        now_playing = films["now_playing"]
        reviews = get_reviews()

        if not friends_activity and not top_rated and not now_playing and not reviews:
            return {"message": "No data found"}, 404
        return jsonify({
            "friends_activity": friends_activity,
            "top_rated": top_rated,
            "now_playing": now_playing,
            "reviews": reviews,
            "user_content": user_content
        }), 200
    
    except Exception as e:
        print(f"An unexpected error occurred: {e}")
        return jsonify({"error": "An internal server error occurred"}), 500