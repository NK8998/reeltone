from dotenv import load_dotenv
load_dotenv()
import requests
import os
import tmdbsimple as tmdb

from api.film.interaction.like import like_film
from api.film.reviews.add import add_review
from api.film.reviews.delete import delete_review
from api.films.filter import filter_by_year, filter_by_genre
from api.film.reviews.edit import edit_review
from api.film.reviews.like import like_review



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

def test_edit_review():
    global clerk_user
    print("Editing review for user:", clerk_user.get("username"))
    response = edit_review(
        clerk_user.get("id"),
        1,
        "Updated review content for testing."
    )
    print("Response:", response)
    assert response.get("message") == "Review updated successfully." or response.get("error") == "Review not found or user not authorized."


def test_delete_review_user():
    global clerk_user
    print("Deleting review for user:", clerk_user.get("username"))
    response = delete_review(
        clerk_user.get("id"),
        1,  
        is_admin=False
    )
    print("Response:", response)
    assert response.get("message") == "Review deleted." or response.get("message") == "Review not found."
    
def test_delete_review_admin():
    global clerk_user
    print("Deleting review as admin for user:", clerk_user.get("username"))
    response = delete_review(
        clerk_user.get("id"),
        1,  
        is_admin=True
    )
    print("Response:", response)
    assert response.get("message") == "Review deleted by admin." or response.get("message") == "Review not found."

def test_search_movies():
    print("Searching for movies...")
    search = tmdb.Search()
    response = search.movie(query="Inception")
    print("Search Response:", response)
    assert 'results' in response and len(response['results']) > 0, "No results found for the search query."

def test_filter_movies():
    print("Filtering movies by year...")
    year = 2019
    filtered_movies = filter_by_year(year)
    assert isinstance(filtered_movies, list), "Filtered movies should be a list."

    print("Filtering movies by genre...")
    genre = "Action"
    filtered_movies_genre = filter_by_genre(genre)
    assert isinstance(filtered_movies_genre, list), "Filtered movies by genre should be a list."

def test_like_film():
    global clerk_user
    print("Liking film for user:", clerk_user.get("username"))
    response = like_film(
        clerk_user.get("id"),
        541671  # Example film ID (ballerina)
    )
    print("Response:", response)
    assert response.get("message") == "Film liked." or response.get("error") == "Like removed."

def test_like_review():
    global clerk_user
    print("Liking review for user:", clerk_user.get("username"))
    response = like_review(
        clerk_user.get("id"),
        1  # Example review ID
    )
    print("Response:", response)
    assert response.get("message") == "Review liked." or response.get("message") == "Like removed."

def test_like_review_remove():
    global clerk_user
    print("Removing like from review for user:", clerk_user.get("username"))
    response = like_review(
        clerk_user.get("id"),
        1  # Example review ID
    )
    print("Response:", response)
    assert response.get("message") == "Like removed." or response.get("message") == "Review liked."



if __name__ == "__main__":
    test_create_account()
    test_verify_password()
    test_add_review()
    test_edit_review()
    test_delete_review_user()
    test_delete_review_admin()
    test_search_movies()
    test_filter_movies()
    test_like_film()
    test_like_review()
    test_like_review_remove()

