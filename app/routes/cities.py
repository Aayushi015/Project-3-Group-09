from flask import Blueprint, jsonify
from models import Location

# Create a blueprint for state routes
cities_bp = Blueprint('cities', __name__)

@cities_bp.route('/cities')
def get_cities():
    return jsonify(Location.get_cities())
