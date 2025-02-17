from flask import Blueprint, jsonify
from models import Location

# Create a blueprint for state routes
counties_bp = Blueprint('counties', __name__)

@counties_bp.route('/counties')
def get_counties():
    return jsonify(Location.get_counties())