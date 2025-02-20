from flask_sqlalchemy import SQLAlchemy
from flask import Flask
import os

# Set SQLite database path
DATABASE_PATH = os.path.abspath("/home/leonardojrr/usa_pollution_app/usa_pollution.db")
db = SQLAlchemy() 

def bind_database(app):
    app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{DATABASE_PATH}'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.init_app(app) 