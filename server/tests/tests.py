from dotenv import load_dotenv
load_dotenv()
import requests
import os
import tmdbsimple as tmdb
import logging
logging.basicConfig(level=logging.INFO)

from api.film.interaction.like import like_film
from api.film.reviews.add import add_review
from api.film.reviews.delete import delete_review
from api.films.filter import filter_films
from api.film.reviews.edit import edit_review
from api.film.reviews.like import like_review
from api.members.follows.add import add_following
from api.members.follows.followers import get_followers
from api.members.follows.following import get_following
from api.members.add import add_member
from api.film.interaction.watched import add_to_watched
from api.film.interaction.watchlist import add_to_watchlist
from api.film.all import check_flags
from api.film.essential.essential import get_by_id



# global clerk_user

# def test_create_account():
#     def createAccount(email, password, first_name, last_name):
#         print("Creating account with email:", email)
#         CLERK_API_URL = "https://api.clerk.com/v1/users"
#         CLERK_SECRET_KEY = os.getenv("CLERK_SECRET_KEY")
        
#         if not CLERK_SECRET_KEY:
#             raise ValueError("CLERK_SECRET_KEY is not set in the environment variables.")

#         headers = {
#             "Authorization": f"Bearer {CLERK_SECRET_KEY}",
#             "Content-Type": "application/json"
#         }
#         data = {
#             "email_address": [email],
#             "password": password,
#             "username": "username_example",  # Replace with a valid username if required
#             "first_name": first_name,
#             "last_name": last_name
#         }
#         response = requests.post(CLERK_API_URL, headers=headers, json=data)
#         return response.json(), response.status_code
    
#     response, status = createAccount(
#         "ne.kainga19@gmail.com",
#         "Str0ng!Passw0rd_Example",
#         "Mike",
#         "Wood"
#     )
#     print("Response:", response)
#     if status == 200:
#         global clerk_user
#         clerk_user = response
#     assert status == 200
#     assert "email_addresses" in response


# def test_verify_password():
#     def verifyPassword(password):
#         print("Verifying password for user:", clerk_user.get("username"))
#         CLERK_API_URL = f"https://api.clerk.com/v1/users/{clerk_user.get('id')}/verify_password"
#         CLERK_SECRET_KEY = os.getenv("CLERK_SECRET_KEY")

#         if not CLERK_SECRET_KEY:
#             raise ValueError("CLERK_SECRET_KEY is not set in the environment variables.")

#         headers = {
#             "Authorization": f"Bearer {CLERK_SECRET_KEY}",
#             "Content-Type": "application/json"
#         }

#         data = {
#             "password": password
#         }

#         response = requests.post(CLERK_API_URL, headers=headers, json=data)
#         print("Status:", response.status_code)
#         print("Response:", response.json())
#         return response.json(), response.status_code

    
#     response, status = verifyPassword(
#         "Str0ng!Passw0rd_Example"
#     )

#     print("Response:", response)
#     assert status == 200

# def test_add_member():
#     global clerk_user
#     print("Adding member for user:", clerk_user.get("username"))
#     # Simulate adding member logic here

#     email_address = clerk_user.get("email_addresses", [])[0].get("email_address", "random_email@example.com") if clerk_user.get("email_addresses") else "random_email@example.com"
#     response_one = add_member(
#         clerk_user.get("id"),
#         clerk_user.get("username", "random_username"),
#         email_address,
#         clerk_user.get("image_url"),
#     )

#     response_two = add_member(
#         "user_2yVh8lNaBVdLravNoJvoqN8zMtp",
#         "neil45",
#         "ne.kioko16@gmail.com",
#         "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18yeVZoOGh6S0tRUXNBZTZweWJ5bzAzdUhKNUcifQ"
#     )
#     print("Response:", response_one)
#     assert response_one.get("message") == "Member added." or response_one.get("message") == "Member already exists."
#     assert response_two.get("message") == "Member added." or response_two.get("message") == "Member already exists."

# def test_add_review():
#     global clerk_user
#     print("Adding review for user:", clerk_user.get("username"))

#     response = add_review(
#         clerk_user.get("id"),
#         clerk_user.get("username", "random_username"),
#         clerk_user.get("image_url"),
#         541671,
#         "ballerina",
#         "https://image.tmdb.org/t/p/w500/2VUmvqsHb6cEtdfscEA6fqqVzLg.jpg",
#         7,
#         "Amazing film! Highly recommend.",
#         is_parent=True,
#         parent_id=None
#     )
#     print("Response:", response)
#     assert response.get("message") == "Review added successfully."

# def test_edit_review():
#     global clerk_user
#     print("Editing review for user:", clerk_user.get("username"))
#     response = edit_review(
#         clerk_user.get("id"),
#         1,
#         "Updated review content for testing.",
#         4
#     )
#     print("Response:", response)
#     assert response.get("message") == "Review updated successfully." or response.get("message") == "Review not found or user not authorized."


# def test_delete_review_user():
#     global clerk_user
#     print("Deleting review for user:", clerk_user.get("username"))
#     response = delete_review(
#         clerk_user.get("id"),
#         1,  
#         is_admin=False
#     )
#     print("Response:", response)
#     assert response.get("message") == "Review deleted." or response.get("message") == "Review not found."
    
# def test_delete_review_admin():
#     global clerk_user
#     print("Deleting review as admin for user:", clerk_user.get("username"))
#     response = delete_review(
#         clerk_user.get("id"),
#         1,  
#         is_admin=True
#     )
#     print("Response:", response)
#     assert response.get("message") == "Review deleted by admin." or response.get("message") == "Review not found."

# def test_search_movies():
#     print("Searching for movies...")
#     search = tmdb.Search()
#     response = search.movie(query="Inception")
#     print("Search Response:", response)
#     assert 'results' in response and len(response['results']) > 0, "No results found for the search query."

# def test_filter_movies():
#     print("Filtering movies by year...")
#     year = 2019
#     filtered_movies = filter_films(start_year=year, end_year=year)
#     assert isinstance(filtered_movies, list), "Filtered movies should be a list."

#     print("Filtering movies by genre...")
#     genre_id = 28
#     filtered_movies_genre = filter_films(genre_id=genre_id)
#     assert isinstance(filtered_movies_genre, list), "Filtered movies by genre should be a list."

# def test_like_film():
#     global clerk_user
#     print("Liking film for user:", clerk_user.get("username"))
#     response = like_film(
#         clerk_user.get("id"),
#         541671  #  (ballerina)
#     )
#     print("Response:", response)
#     assert response.get("message") == "Film liked." or response.get("error") == "Like removed."

# def test_add_to_watched():
#     global clerk_user
#     print("Adding film to watched for user:", clerk_user.get("username"))
#     response = add_to_watched(
#         clerk_user.get("id"),
#         541671,  #  (ballerina)
#         "ballerina",  
#         "example_poster_url.jpg"  
#     )
#     print("Response:", response)
#     assert response.get("message") == "Film added to watched list." or response.get("error") == "Film removed from watched list."

# def test_add_to_watchlist():
#     global clerk_user
#     print("Adding film to watchlist for user:", clerk_user.get("username"))
#     response = add_to_watchlist(
#         clerk_user.get("id"),
#         541671,  # Example film ID (ballerina)
#         "ballerina",  # Example film title
#         "example_poster_url.jpg"  # Example poster URL
#     )
#     print("Response:", response)
#     assert response.get("message") == "Film added to watchlist." or response.get("error") == "Film removed from watchlist."

# def test_user_flags():
#     global clerk_user
#     print("Checking user flags for film...")
#     has_liked, in_watchlist, watched = check_flags(
#         clerk_user.get("id"),
#         541671  # Example film ID (ballerina)
#     )
#     print("User Flags Response:", has_liked, in_watchlist, watched)
#     assert isinstance(has_liked, bool), "has_liked should be a boolean."
#     assert isinstance(in_watchlist, bool), "in_watchlist should be a boolean."
#     assert isinstance(watched, bool), "watched should be a boolean."

# def test_like_review():
#     global clerk_user
#     print("Liking review for user:", clerk_user.get("username"))
#     response = like_review(
#         clerk_user.get("id"),
#         1  # Example review ID
#     )
#     print("Response:", response)
#     assert response.get("message") == "Review liked." or response.get("message") == "Like removed."

# def test_like_review_remove():
#     global clerk_user
#     print("Removing like from review for user:", clerk_user.get("username"))
#     response = like_review(
#         clerk_user.get("id"),
#         1  # Example review ID
#     )
#     print("Response:", response)
#     assert response.get("message") == "Like removed." or response.get("message") == "Review liked."

# def test_following():
#     user_id_one = "user_2yVh8lNaBVdLravNoJvoqN8zMtp"
#     user_id_two = clerk_user.get("id", "user_300rf5J4W5nzrTJmFbDOcer3nKJ")  # Example user ID
#     # Simulate following logic here
#     response = add_following(user_id_one, user_id_two)
#     response = add_following(user_id_two, user_id_one)
#     assert response.get("message") == "Following relationship added." or response.get("message") == "Unfollowed user."

# def test_get_followers():
#     user_id_one = "user_2yVh8lNaBVdLravNoJvoqN8zMtp"
#     print(f"Getting followers for user: {user_id_one}")
#     response = get_followers(user_id_one)
#     print("Response:", response)
#     assert isinstance(response, list), "Followers should be a list."

#     user_id_two = clerk_user.get("id", "user_300rf5J4W5nzrTJmFbDOcer3nKJ")  # Example user ID
#     print(f"Getting followers for user: {user_id_two}")
#     response = get_followers(user_id_two)
#     print("Response:", response)
#     assert isinstance(response, list), "Followers should be a list."

# def test_get_following():
#     user_id_one = "user_2yVh8lNaBVdLravNoJvoqN8zMtp"
#     print(f"Getting following for user: {user_id_one}")
#     response = get_following(user_id_one)
#     print("Response:", response)
#     assert isinstance(response, list), "Following should be a list."

#     user_id_two = clerk_user.get("id", "user_300rf5J4W5nzrTJmFbDOcer3nKJ")  # Example user ID
#     print(f"Getting following for user: {user_id_two}")
#     response = get_following(user_id_two)
#     print("Response:", response)
#     assert isinstance(response, list), "Following should be a list."

def test_get_film_by_id():
    response = get_by_id(541671)  # ballerina
    assert response.get("id") == 541671, "Film ID should match."

if __name__ == "__main__": 
    pass
    # test_create_account()
    # test_verify_password()
    # test_add_member()
    # test_add_review()
    # test_edit_review()
    # test_delete_review_user()
    # test_delete_review_admin()
    # test_search_movies()
    # test_filter_movies()
    # test_like_film()
    # test_like_review()
    # test_like_review_remove()
    # test_following()
    # test_get_followers()
    # test_get_following()
    test_get_film_by_id()

