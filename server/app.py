from flask import Flask, jsonify, session, request, g
from flask_cors import CORS

from models import *
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
print(app.config['SQLALCHEMY_DATABASE_URI'])


db = SQLAlchemy(app)

@app.route('/')
def index():
    return jsonify({'success': True}), 200


@app.before_request
def before_request():
    g.user = None

    if 'user_id' in session:
        user = User.query.filter(User.id==session['user_id']).first()
        g.user = user


@app.route('/login', methods=['POST'])
def login():
    session.pop('user_id', None)

    username = request.form['username']
    password = request.form['password']

    try:
        user = User.query.filter(User.username==username).first()
    except IndexError:
        return jsonify({'Error': 'User {user} not found.'.format(user=username)}), 401

    if user.password == password:
        session['user_id'] = user.id
        return jsonify({'Success': 'Successfully signed in as {user}.'.format(user=username), 'username': username}), 200
    else:
        return jsonify({'Error': 'User {user} and password combination is incorrect.'.format(user=username)}), 401


if __name__ == "__main__":
    app.run(port=5000)

