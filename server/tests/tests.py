from dotenv import load_dotenv
load_dotenv()
import requests
import os

from api.film.interaction.like import like_film
from api.film.reviews.add import add_review




global clerk_user

def test_create_account():
    def createAccount(email, password, first_name, last_name):
        print("Creating account with email:", email)
        CLERK_API_URL = "https://api.clerk.com/v1/users"
        CLERK_SECRET_KEY = os.getenv("CLERK_SECRET_KEY")
        
        if not CLERK_SECRET_KEY:
            raise ValueError("CLERK_SECRET_KEY is not set in the environment variables.")

        headers = {
            "Authorization": f"Bearer {CLERK_SECRET_KEY}",
            "Content-Type": "application/json"
        }
        data = {
            "email_address": [email],
            "password": password,
            "username": "username_example",  # Replace with a valid username if required
            "first_name": first_name,
            "last_name": last_name
        }
        response = requests.post(CLERK_API_URL, headers=headers, json=data)
        return response.json(), response.status_code
    
    response, status = createAccount(
        "ne.kainga19@gmail.com",
        "Str0ng!Passw0rd_Example",
        "Mike",
        "Wood"
    )
    print("Response:", response)
    if status == 200:
        global clerk_user
        clerk_user = response
    assert status == 200
    assert "email_addresses" in response


def test_verify_password():
    def verifyPassword(password):
        print("Verifying password for user:", clerk_user.get("username"))
        CLERK_API_URL = f"https://api.clerk.com/v1/users/{clerk_user.get('id')}/verify_password"
        CLERK_SECRET_KEY = os.getenv("CLERK_SECRET_KEY")

        if not CLERK_SECRET_KEY:
            raise ValueError("CLERK_SECRET_KEY is not set in the environment variables.")

        headers = {
            "Authorization": f"Bearer {CLERK_SECRET_KEY}",
            "Content-Type": "application/json"
        }

        data = {
            "password": password
        }

        response = requests.post(CLERK_API_URL, headers=headers, json=data)
        print("Status:", response.status_code)
        print("Response:", response.json())
        return response.json(), response.status_code

    
    response, status = verifyPassword(
        "Str0ng!Passw0rd_Example"
    )

    print("Response:", response)
    assert status == 200

def test_add_review():
    global clerk_user
    print("Adding review for user:", clerk_user.get("username"))

    response = add_review(
        clerk_user.get("id"),
        clerk_user.get("username", "random_username"),
        clerk_user.get("image_url"),
        541671,
        "ballerina",
        "https://image.tmdb.org/t/p/w500/2VUmvqsHb6cEtdfscEA6fqqVzLg.jpg",
        7,
        "Amazing film! Highly recommend.",
        is_parent=True,
        parent_id=None
    )
    print("Response:", response)
    assert response.get("message") == "Review added successfully."

if __name__ == "__main__":
    test_create_account_success()
    test_verify_password()
    test_add_review()

