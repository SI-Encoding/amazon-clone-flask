from flask import Flask, jsonify, session, request, g
from flask_cors import CORS

from models import *



app = Flask(__name__)
app.secret_key = 'swreagbnekiakbgkagv'
CORS(app)
cors = CORS(app, resource = {
    r"/*": {
        "origins": "*"
    }
})

@app.route('/')
def index():
    return jsonify({'success': True}), 200


@app.before_request
def before_request():
    g.user = None

    if 'user_id' in session:
        user = [x for x in users if x.id == session['user_id']][0]
        g.user = user


@app.route('/login', methods=['POST'])
def login():
    session.pop('user_id', None)

    username = request.form['username']
    password = request.form['password']

    try:
        user = [u for u in users if u.username == username][0]
    except IndexError:
        return jsonify({'Error': 'User {user} not found.'.format(user=username)}), 401

    if user.password == password:
        session['user_id'] = user.id
        return jsonify({'Success': 'Successfully signed in as {user}.'.format(user=username)}), 200
    else:
        return jsonify({'Error': 'User {user} and password combination is incorrect.'.format(user=username)}), 401


if __name__ == "__main__":
    app.run(port=5000)

