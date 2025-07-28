import tmdbsimple as tmdb
from . import films_bp
from flask import request

def filter_by_year(year):
    """Filter films by year."""
    search = tmdb.Search()
    response = search.movie(year=year)
    if not response or 'results' not in response:
        return []
    
    filtered_films = []
    for movie in response['results']:
        filtered_films.append({
            "id": movie.get("id"),
            "title": movie.get("title"),
            "overview": movie.get("overview"),
            "poster_path": f"https://image.tmdb.org/t/p/w500{movie.get('poster_path')}" if movie.get("poster_path") else None,
            "release_date": movie.get("release_date"),
            "vote_average": movie.get("vote_average"),
            "vote_count": movie.get("vote_count"),
        })
    return filtered_films

def filter_by_genre(genre): 
    """Filter films by genre."""
    search = tmdb.Search()
    response = search.movie(genre=genre)
    if not response or 'results' not in response:
        return []
    
    filtered_films = []
    for movie in response['results']:
        filtered_films.append({
            "id": movie.get("id"),
            "title": movie.get("title"),
            "overview": movie.get("overview"),
            "poster_path": f"https://image.tmdb.org/t/p/w500{movie.get('poster_path')}" if movie.get("poster_path") else None,
            "release_date": movie.get("release_date"),
            "vote_average": movie.get("vote_average"),
            "vote_count": movie.get("vote_count"),
        })
    return filtered_films


@films_bp.route("/filter/year", methods=["GET"])
def filter_films_by_year_route():
    """Fetch filtered films from TMDB."""
    try:
        year = request.args.get("year")

        filtered_films = filter_by_year(year=year)

        if not filtered_films:
            return {"message": "No films found"}, 404

        return {"filtered_films": filtered_films}, 200
    except Exception as e:
        print(f"An unexpected error occurred: {e}")
        return {"error": "An internal server error occurred"}, 500

@films_bp.route("/filter/genre", methods=["GET"])
def filter_films_by_genre_route():
    """Fetch filtered films by genre from TMDB."""
    try:
        genre = request.args.get("genre")
        filtered_films = filter_by_genre(genre=genre)

        if not filtered_films:
            return {"message": "No films found"}, 404
        return {"filtered_films": filtered_films}, 200
    except Exception as e:
        print(f"An unexpected error occurred: {e}")
        return {"error": "An internal server error occurred"}, 500
