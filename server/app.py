from flask import Flask
from flask_cors import CORS

from settings import PGUSER, PGPASS, PGHOST, PGDB, SECRET_KEY

from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.secret_key = SECRET_KEY
CORS(app)
cors = CORS(app, resource = {
    r"/*": {
        "origins": "*"
    }
})

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://{PGUSER}:{PGPASS}@{PGHOST}/{PGDB}".format(PGUSER=PGUSER,PGPASS=PGPASS,PGHOST=PGHOST,PGDB=PGDB)


db = SQLAlchemy(app)

