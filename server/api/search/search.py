from . import search_bp
import tmdbsimple as tmdb
from flask import request


def get_by_title(title, page=1):
    """Fetch film details by title from TMDB."""
    search = tmdb.Search()
    movie_response = search.movie(query=title, page=page)
    if 'status_code' in movie_response and movie_response['status_code'] != 200:
        return None
    
    for movie in movie_response.get('results', []):
        movie['poster_url'] = f"https://image.tmdb.org/t/p/w500{movie['poster_path']}" if movie.get('poster_path') else None
        movie['backdrop_url'] = f"https://image.tmdb.org/t/p/w780{movie['backdrop_path']}" if movie.get('backdrop_path') else None

    movie_response['nextPage'] = page + 1 if page * 20 < movie_response.get('total_results', 0) else None

    return movie_response

@search_bp.route('/title/<string:title>', methods=['GET'])
def search_by_title(title):
    """API endpoint to search for films by title."""
    page = request.args.get('page', default=1, type=int)
    results = get_by_title(title, page)
    if results is None:
        return {"error": "Film not found"}, 204
    return {"results": results.get('results', []), "currentPage": page, "nextPage": results.get('nextPage')}, 200