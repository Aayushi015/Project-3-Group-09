from flask import Flask
from database import bind_database

#Routes
from routes.pollutant import pollutant_bp
from routes.states import states_bp
from routes.counties import counties_bp
from routes.cities import cities_bp


app = Flask(__name__)

bind_database(app)

#Register Routes
app.register_blueprint(pollutant_bp, url_prefix='/api')
app.register_blueprint(states_bp, url_prefix='/api')
app.register_blueprint(counties_bp, url_prefix='/api')
app.register_blueprint(cities_bp, url_prefix='/api')


# if __name__ == '__main__':
#     app.run(debug=True)