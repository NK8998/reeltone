from flask import request, jsonify
from . import landing_bp 

@landing_bp.route("/all", methods=["GET"])
async def all():
    films = [
        {"id": 1, "title": "Film A", "year": 2020},
        {"id": 2, "title": "Film B", "year": 2021},
        {"id": 3, "title": "Film C", "year": 2022},
    ]

    # Apply filters and sorting logic here
    # ...

    return jsonify({"films": films}), 200