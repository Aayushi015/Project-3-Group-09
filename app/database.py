from flask_sqlalchemy import SQLAlchemy
import os

# Set SQLite database path
DATABASE_PATH = os.path.abspath(os.path.join(os.path.dirname(__file__), "usa_pollution.db"))
db = SQLAlchemy() 

def bind_database(app):
    app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{DATABASE_PATH}'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.init_app(app) 