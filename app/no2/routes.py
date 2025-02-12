from flask import Blueprint

# Create a blueprint for state routes
no2_bp = Blueprint('no2', __name__)

@no2_bp.route('/')
def get_state():
    return "no2 data"