import tmdbsimple as tmdb
from . import films_bp
from flask import request

MAX_API_CALLS = 3

def filter_films(start_year=None, end_year=None, genre_id=None, min_rating=None, min_votes=None,
                 min_runtime=None, max_runtime=None, language=None, sort_by='popularity.desc', page=1):
    """Filter films with up to 60 results across 3 pages."""
    if page < 1:
        page = 1

    discover = tmdb.Discover()

    base_query = {
        'sort_by': sort_by,
        'language': 'en-US',
        'include_adult': False 
    }

    if start_year:
        base_query['primary_release_date.gte'] = f'{start_year}-01-01'
    if end_year:
        base_query['primary_release_date.lte'] = f'{end_year}-12-31'
    if genre_id:
        base_query['with_genres'] = genre_id
    if min_rating:
        base_query['vote_average.gte'] = min_rating
    if min_votes:
        base_query['vote_count.gte'] = min_votes
    if min_runtime:
        base_query['with_runtime.gte'] = min_runtime
    if max_runtime:
        base_query['with_runtime.lte'] = max_runtime
    if language:
        base_query['with_original_language'] = language

    filtered_films = []
    end_page = page * MAX_API_CALLS + 1
    start_page = end_page - MAX_API_CALLS

    for current_page in range(start_page, end_page):  # pages 1 through 3
        response = discover.movie(**{**base_query, 'page': current_page})
        if not response or 'results' not in response:
            break

        for movie in response['results']:
            filtered_films.append({
                "id": movie.get("id"),
                "title": movie.get("title"),
                "overview": movie.get("overview"),
                "poster_url": f"https://image.tmdb.org/t/p/w500{movie.get('poster_path')}" if movie.get("poster_path") else None,
                "release_date": movie.get("release_date"),
                "vote_average": movie.get("vote_average"),
                "vote_count": movie.get("vote_count"),
            })

    return filtered_films



GENRE_NAME_TO_ID = {
    "action": 28,
    "adventure": 12,
    "animation": 16,
    "comedy": 35,
    "crime": 80,
    "documentary": 99,
    "drama": 18,
    "family": 10751,
    "fantasy": 14,
    "history": 36,
    "horror": 27,
    "music": 10402,
    "mystery": 9648,
    "romance": 10749,
    "science fiction": 878,
    "tv movie": 10770,
    "thriller": 53,
    "war": 10752,
    "western": 37
}


@films_bp.route('/filter', methods=['GET'])
def filter_movies_route():
    args = request.args

    def get_arg(name, type_=int):
        val = args.get(name)
        return type_(val) if val and val.replace('.', '', 1).isdigit() else None

    # Handle year, start_year, end_year
    year = get_arg('year')
    start_year = get_arg('start_year')
    end_year = get_arg('end_year')

    if year:
        start_year = end_year = year

    min_rating = get_arg('min_rating', float)
    min_votes = get_arg('min_votes')
    min_runtime = get_arg('min_runtime')
    max_runtime = get_arg('max_runtime')
    page = get_arg('page') or 1
    language = args.get('language')
    sort_by = args.get('sort_by') or 'popularity.desc'

    # Support genre as name or ID
    genre_param = args.get('genre')
    genre = None
    if genre_param:
        if genre_param.isdigit():
            genre = int(genre_param)
        else:
            genre_key = genre_param.strip().lower()
            genre = GENRE_NAME_TO_ID.get(genre_key)

    results = filter_films(
        start_year=start_year,
        end_year=end_year,
        genre_id=genre,
        min_rating=min_rating,
        min_votes=min_votes,
        min_runtime=min_runtime,
        max_runtime=max_runtime,
        language=language,
        sort_by=sort_by,
        page=page
    )

    return {"filtered_films": results}



