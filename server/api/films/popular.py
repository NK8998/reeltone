import tmdbsimple as tmdb
from . import films_bp
from datetime import datetime, timedelta

def get_popular_films():
    """Fetch popular films from TMDB API. Return as a list of dictionaries."""
    discover = tmdb.Discover()
    today = datetime.today()
    one_week_ago = today - timedelta(days=28)
    
    query = {
        'primary_release_date.gte': one_week_ago.strftime('%Y-%m-%d'),
        'primary_release_date.lte': today.strftime('%Y-%m-%d'),
        'sort_by': 'popularity.desc',
    }
    response = discover.movie(**{**query, 'page': 1})

    # Extract relevant fields
    recent_films = []
    for movie in response['results']:
        recent_films.append({
                'id': movie.get('id'),
                'title': movie.get('title'),
                'original_title': movie.get('original_title'),
                'overview': movie.get('overview'),
                'release_date': movie.get('release_date'),
                'runtime': movie.get('runtime'),
                'genres': [genre['name'] for genre in movie.get('genres', [])],
                'vote_average': movie.get('vote_average'),
                'vote_count': movie.get('vote_count'),
                'poster_path': movie.get('poster_path') if movie.get("poster_path") else None,
                'poster_url': f"https://image.tmdb.org/t/p/w500{movie.get('poster_path')}" if movie.get("poster_path") else None,
                'backdrop_path': f"https://image.tmdb.org/t/p/w1280{movie.get('backdrop_path')}" if movie.get("backdrop_path") else None,
                
        })

    return recent_films


@films_bp.route("/popular", methods=["GET"])
def popular_films():
    """Fetch popular films from TMDB."""
    try:
        popular_films = get_popular_films()
        if not popular_films:
            return {"message": "No popular films found"}, 404
        return {"popular_films": popular_films}, 200
    except Exception as e:
        print(f"An unexpected error occurred: {e}")
        return {"error": "An internal server error occurred"}, 500