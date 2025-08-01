from flask import Blueprint

film_bp = Blueprint('film', __name__, url_prefix='/film')

from . import all
from .extra.related import *
from .extra.ratings import *
from .interaction.like import *
from .interaction.watchlist import *
from .interaction.watched import *
from .reviews.like import *
from .reviews.add import *
from .reviews.get import *
from .reviews.delete import *
from .reviews.edit import *
