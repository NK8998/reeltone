from flask import Blueprint

landing_bp = Blueprint('landing', __name__, url_prefix='/landing')

from . import all
from . import films
from . import recent



