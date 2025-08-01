from .. import film_bp
import tmdbsimple as tmdb
from flask import jsonify, request
from pprint import pprint

def get_film_trailer(videos):
    """Fetch official YouTube trailer from a TMDB video list."""
    trailers = [
        video for video in videos.get('results', [])
        if video['type'] == 'Trailer' and video['site'] == 'YouTube'
    ]

    official = next((v for v in trailers if 'official' in v.get('name', '').lower()), None)
    if official:
        return f"https://www.youtube.com/embed/{official['key']}"

    if trailers:
        return f"https://www.youtube.com/embed/{trailers[0]['key']}"

    return None

def get_by_id(film_id):
    """Fetch film details by ID from TMDB."""
    movie = tmdb.Movies(film_id)
    response = movie.info(append_to_response='credits,videos')  # ✅ fixed

    if 'status_code' in response and response['status_code'] != 200:
        return None

    response['cast'] = response.get('credits', {}).get('cast', [])
    response['crew'] = response.get('credits', {}).get('crew', [])
    response['trailer'] = get_film_trailer(response.get('videos', {}))

    # Optionally remove raw credits/videos
    response.pop('credits', None)
    response.pop('videos', None)

    return response

def get_by_title(title):
    """Fetch film details by title from TMDB."""
    search = tmdb.Search()
    movie_response = search.movie(query=title)
    if 'status_code' in movie_response and movie_response['status_code'] != 200:
        return None
    response = get_by_id(movie_response['results'][0]['id'])

    return response


def get_essential_data(query):
    """
    Fetch essential data for a film from TMDB.
    """
    response = None
    if query.isdigit():
        # If the query is a number, treat it as a film ID
        film_id = int(query)
        response = get_by_id(film_id)
    else:
        # Otherwise, treat it as a film title
        response = get_by_title(query)
    
    if response is None:
        return None
    essential_data = {
        'id': response.get('id'),
        'title': response.get('title'),
        'original_title': response.get('original_title'),
        'overview': response.get('overview'),
        'release_date': response.get('release_date'),
        'runtime': response.get('runtime'),
        'genres': [genre['name'] for genre in response.get('genres', [])],
        'vote_average': response.get('vote_average'),
        'vote_count': response.get('vote_count'),
        'poster_path': f"https://image.tmdb.org/t/p/w500{response.get('poster_path')}" if response.get("poster_path") else None,
        'backdrop_path': f"https://image.tmdb.org/t/p/w1280{response.get('backdrop_path')}" if response.get("backdrop_path") else None,
        'cast': response.get('cast', []),
        'crew': response.get('crew', []),
        'production_companies': [company['name'] for company in response.get('production_companies', [])],
        'production_countries': [country['name'] for country in response.get('production_countries', [])],
        'spoken_languages': [language['name'] for language in response.get('spoken_languages', [])],
        'run_time': response.get('runtime', 0),
        'trailer': response.get('trailer', {})
    }
    return essential_data
    

@film_bp.route('/essential', methods=['GET'])
def essential():
    try:
        query = request.args.get('query')
        if not query:
            return jsonify({'error': 'query is required'}), 400
        essential_data = get_essential_data(query)
        if essential_data is None:
            return jsonify({'error': 'Film not found'}), 404
        return jsonify(essential_data), 200
    except ValueError:
        return jsonify({'error': 'Invalid query format'}), 400
