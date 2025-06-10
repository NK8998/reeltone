from flask import Blueprint

bp = Blueprint('api', __name__)

from .auth import auth_bp
from .landing import landing_bp
from .me import me_bp
from .films import films_bp
from .film import film_bp
from .members import members_bp