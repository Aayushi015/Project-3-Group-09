from flask import Blueprint,jsonify, request
from models import Pollutant, PollutantType, SearchParamns, POLLUTANT_FIELDS
from typing import List

# Create a blueprint for state routes
pollutant_bp = Blueprint('pollutant', __name__)

@pollutant_bp.route('/pollutant/<string:pollutant_type>')
def get_pollutans(pollutant_type):

    match pollutant_type:
        case 'o3':
            pollutant_type = PollutantType.O3
        
        case 'so2':
            pollutant_type = PollutantType.SO2
        
        case 'co':
            pollutant_type = PollutantType.CO

        case 'no2':
            pollutant_type = PollutantType.NO2

        case _:
            return jsonify({"error": "That pollutant is not supported in this API"}), 400

    state = request.args.get('state', type=str)
    county = request.args.get('county', type=str)
    city = request.args.get('city', type=str)
    latitude = request.args.get('latitude', type=float)
    longitude = request.args.get('longitude', type=float)

    year = request.args.get('year', type=int)
    month = request.args.get('month', type=int)
    day = request.args.get('day', type=int)

    aqi = request.args.get('aqi', type=float)
    mean = request.args.get('mean', type=float)
    max_value = request.args.get('max_value', type=float)
    max_hour = request.args.get('max_hour', type=float)

    search_params = SearchParamns(state, county, city, latitude, longitude, year, month, day, aqi, mean, max_value, max_hour)
    pollutants: List[Pollutant] = Pollutant.get_pollutans(search_params, pollutant_type)

    fields = POLLUTANT_FIELDS[pollutant_type]
    return jsonify([
        {
            "id": pollutant.id,
            "location": pollutant.location.to_dict(),
            "aqi": getattr(pollutant, fields[0]),
            "mean": getattr(pollutant, fields[1]),
            "first_max_hour": getattr(pollutant, fields[2]),
            "max_value": getattr(pollutant, fields[3]),
            "year": pollutant.year,
            "month": pollutant.month,
            "day": pollutant.day
        }
        for pollutant in pollutants
    ])   