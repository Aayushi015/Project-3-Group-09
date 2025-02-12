from flask import Blueprint

# Create a blueprint for state routes
so2_bp = Blueprint('so2', __name__)

@so2_bp.route('/')
def get_state():
    return "so2 data"