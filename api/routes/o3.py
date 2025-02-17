from flask import Blueprint
from models import Pollutant

o3_bp = Blueprint('o3', __name__)

@o3_bp.route('/')
def get_county():
    a = Pollutant.query.all()
    print(a)
    return "xd"