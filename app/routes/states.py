from flask import Blueprint, jsonify
from models import Location
import os
from time import sleep

# Create a blueprint for state routes
states_bp = Blueprint('states', __name__)

@states_bp.route('/states')
def get_states():
    #print("="*80)
    # print("states line 12")
    # print(os.getcwd())
    # print("="*80)
    # sleep(30)
    # print("="*80)

    return jsonify(Location.get_states())
    # return str(os.getcwd())