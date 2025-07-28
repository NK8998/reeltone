import os
import sqlite3
import requests

def get_db_connection(base_dir):
    """
    Connects to the database given a base directory.
    Args:
        base_dir (str): The absolute path to the directory from which
                        the 'db' directory can be found (e.g., '/path/to/server').
    """
    db_path = os.path.join(base_dir, 'db', 'reeltone.db')
    print(f"Helper trying to connect to: {db_path}")
    conn = sqlite3.connect(db_path)
    return conn

def get_clerk_user_details(user_id):
    """
    Fetches user details from Clerk API using the user ID.
    
    """
    CLERK_API_URL = f"https://api.clerk.com/v1/users/{user_id}"
    CLERK_SECRET_KEY = os.getenv("CLERK_SECRET_KEY")

    headers = {
        "Authorization": f"Bearer {CLERK_SECRET_KEY}",
        "Content-Type": "application/json"
    }

    response = requests.get(CLERK_API_URL, headers=headers)

    if response.status_code == 200:
        return response.json()
    else:
        print(f"Error fetching user details: {response.status_code}")
        return None

def check_is_admin(user_id):
    """
    Checks if a user is an admin.
    """
    user_details = get_clerk_user_details(user_id)
    print (f"User details for {user_id}: {user_details}")
    if user_details:
        return user_details.get("role") == "admin"
    return False

