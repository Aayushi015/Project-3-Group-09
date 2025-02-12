from flask import Blueprint

# Create a blueprint for state routes
co_bp = Blueprint('co', __name__)

@co_bp.route('/')
def get_state():
    return "co data"