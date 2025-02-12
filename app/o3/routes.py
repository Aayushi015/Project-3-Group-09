from flask import Blueprint

# Create a blueprint for state routes
o3_bp = Blueprint('o3', __name__)

@o3_bp.route('/')
def get_state():
    return "o3 data"