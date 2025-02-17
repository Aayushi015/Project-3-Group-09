from flask import Blueprint

no2_bp = Blueprint('no2', __name__)

@no2_bp.route('/')
def get_county():
    return "County data"