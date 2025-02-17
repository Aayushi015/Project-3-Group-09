from flask import Blueprint

co_bp = Blueprint('co', __name__)

@co_bp.route('/')
def get_county():
    return "County data"