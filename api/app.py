from flask import Flask
import sqlite3

#Routes
from o3.routes import o3_bp
from so2.routes import so2_bp
from no2.routes import no2_bp
from co.routes import co_bp

app = Flask(__name__)

#Register Routes
app.register_blueprint(o3_bp, url_prefix='/o3')
app.register_blueprint(so2_bp, url_prefix='/so2')
app.register_blueprint(no2_bp, url_prefix='/no2')
app.register_blueprint(co_bp, url_prefix='/co')

if __name__ == '__main__':
    app.run(debug=True)