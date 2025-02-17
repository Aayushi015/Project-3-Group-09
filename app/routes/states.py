from flask import Blueprint, jsonify
from models import Location

# Create a blueprint for state routes
states_bp = Blueprint('states', __name__)

@states_bp.route('/states')
def get_states():
    return jsonify(Location.get_states())