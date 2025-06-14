from . import film_bp
from flask import jsonify, request
from .essential.essential import get_essential_data
from .reviews.get import get_reviews_by_film_id
from .extra.related import get_related_films

@film_bp.route('/all', methods=['GET'])
def all_films():
    """Fetch all films from the database."""
    try:
        query = request.args.get('query')
        if not query:
            return jsonify({'error': 'query is required'}), 400
        
        essential_data = get_essential_data(query)

        if essential_data is None:
            return jsonify({'error': 'Film not found'}), 404
        
        film_id = essential_data.get('id')
        if not film_id:
            return jsonify({'error': 'Film ID not found in the response'}), 404
        
        reviews = get_reviews_by_film_id(film_id)
        related_films = get_related_films(film_id)
        
        return jsonify({
            'essential_data': essential_data,
            'reviews': reviews,
            'related_films': related_films
        }), 200
    except ValueError:
        return jsonify({'error': 'Invalid query format'}), 400
    
