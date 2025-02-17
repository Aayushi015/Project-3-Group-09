from flask import Blueprint

so2_bp = Blueprint('so2', __name__)

@so2_bp.route('/')
def get_county():
    return "County data"