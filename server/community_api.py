# community_api.py
from flask import Blueprint, jsonify, request

# Create a new Blueprint instance for our community-related API routes
community_bp = Blueprint('community', __name__, url_prefix='/api/members')

# --- Mock Data to simulate a database ---
# The mock data now doesn't include a hardcoded "CurrentUser".
# This allows any new Clerk user to be dynamically added.
all_members = [
    {
        "user_id": "1",
        "username": "Alex Johnson",
        "pfp_url": "https://placehold.co/100x100/50C878/000000?text=AJ",
        "bio": "Critiquing the classics, one movie at a time. My blog is 'The Reel Reviewer'.",
        "recentActivity": "Posted a photo from a mountain trail."
    },
    {
        "user_id": "2",
        "username": "Sarah Lee",
        "pfp_url": "https://placehold.co/100x100/ADD8E6/000000?text=SL",
        "bio": "Lover of indie cinema and animated masterpieces. I run a film festival.",
        "recentActivity": "Shared a new design portfolio piece."
    },
    {
    "user_id": "3",
    "username": "Michael Chen",
    "pfp_url": "https://placehold.co/100x100/F08080/000000?text=MC",
    "bio": "Aspiring screenwriter with a soft spot for sci-fi epics. Just finished my first draft.",
    "recentActivity": "Wrote a new blog post about data visualization."
    },
    {
        "user_id": "4",
        "username": "Emily Davis",
        "pfp_url": "https://placehold.co/100x100/8A2BE2/000000?text=ED",
        "bio": "Director and visual effects artist. Currently working on a short film.",
        "recentActivity": "Just published a new React component."
    },
    {
        "user_id": "5",
        "username": "David Rodriguez",
        "pfp_url": "https://placehold.co/100x100/B0E0E6/000000?text=DR",
        "bio": "Documentary filmmaker and world traveler. I love stories that change perspectives.",
        "recentActivity": "Updated his profile with a new location."
    },
    {
        "user_id": "12345",  # This is the "current user" from the React frontend
        "username": "Jordan Walker",
        "pfp_url": "https://placehold.co/100x100/FFD700/000000?text=JW",
        "bio": "Movie enthusiast and film festival volunteer. I love finding hidden gems.",
        "recentActivity": "Logged in and is checking out the community!"
    }
]

# A dictionary to manage followers/following relationships
# Key: user_id of the user whose list we are retrieving
# Value: a list of user_ids that follow or are followed by the key user
follows_data = {
    "12345": {
        "followers": ["1", "2", "3"],
        "following": ["2", "4", "5"]
    },
    "1": {
        "followers": ["12345"],
        "following": ["2", "3"]
    },
    "2": {
        "followers": ["1", "12345"],
        "following": ["5"]
    },
    "3": {
        "followers": ["12345"],
        "following": ["1", "2"]
    },
    "4": {
        "followers": [],
        "following": ["12345"]
    },
    "5": {
        "followers": ["2"],
        "following": ["12345"]
    }
}

# Helper function to get user details from a list of user IDs
def get_users_from_ids(user_ids):
    """
    Finds and returns full user objects for a given list of user IDs.
    """
    return [member for member in all_members if member["user_id"] in user_ids]


# --- API Routes defined on the Blueprint ---

@community_bp.route('/all', methods=['GET'])
def get_all_members():
    """
    Returns a JSON list of all community members.
    The final URL will be /api/members/all
    """
    print("Received GET request for /api/members/all")
    return jsonify({"members": all_members})

@community_bp.route('/follows/followers', methods=['POST'])
def get_followers():
    """
    Expects a JSON body with a 'user_id' and returns that user's followers.
    The final URL will be /api/members/follows/followers
    """
    data = request.json
    user_id = data.get("user_id")

    if not user_id:
        return jsonify({"error": "user_id is required"}), 400

    follower_ids = follows_data.get(user_id, {}).get("followers", [])
    followers_list = get_users_from_ids(follower_ids)
    
    print(f"Received POST request for /api/members/follows/followers for user {user_id}")
    return jsonify({"followers": followers_list})

@community_bp.route('/follows/following', methods=['POST'])
def get_following():
    """
    Expects a JSON body with a 'user_id' and returns who that user is following.
    The final URL will be /api/members/follows/following
    """
    data = request.json
    user_id = data.get("user_id")

    if not user_id:
        return jsonify({"error": "user_id is required"}), 400

    following_ids = follows_data.get(user_id, {}).get("following", [])
    following_list = get_users_from_ids(following_ids)
    
    print(f"Received POST request for /api/members/follows/following for user {user_id}")
    return jsonify({"following": following_list})


# --- Routes to add/remove a follow relationship ---

@community_bp.route('/follows/add', methods=['POST'])
def add_follow():
    """
    Adds a follow relationship. Expects 'follower_id' and 'following_id'.
    """
    data = request.json
    follower_id = data.get("follower_id")
    following_id = data.get("following_id")

    if not follower_id or not following_id:
        return jsonify({"error": "follower_id and following_id are required"}), 400

    # Ensure the user IDs exist in our data structure
    if follower_id not in follows_data:
        follows_data[follower_id] = {"followers": [], "following": []}
    if following_id not in follows_data:
        follows_data[following_id] = {"followers": [], "following": []}

    # Add to the follower's "following" list if not already present
    if following_id not in follows_data[follower_id]["following"]:
        follows_data[follower_id]["following"].append(following_id)
    
    # Add to the followed user's "followers" list if not already present
    if follower_id not in follows_data[following_id]["followers"]:
        follows_data[following_id]["followers"].append(follower_id)

    print(f"User {follower_id} is now following user {following_id}")
    return jsonify({"message": "Follow added successfully"})


@community_bp.route('/follows/remove', methods=['POST'])
def remove_follow():
    """
    Removes a follow relationship. Expects 'follower_id' and 'following_id'.
    """
    data = request.json
    follower_id = data.get("follower_id")
    following_id = data.get("following_id")

    if not follower_id or not following_id:
        return jsonify({"error": "follower_id and following_id are required"}), 400
    
    # Remove from the follower's "following" list
    if following_id in follows_data.get(follower_id, {}).get("following", []):
        follows_data[follower_id]["following"].remove(following_id)
        
    # Remove from the followed user's "followers" list
    if follower_id in follows_data.get(following_id, {}).get("followers", []):
        follows_data[following_id]["followers"].remove(follower_id)

    print(f"User {follower_id} has unfollowed user {following_id}")
    return jsonify({"message": "Follow removed successfully"})
