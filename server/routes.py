from models import *
from app import *
from controller import Controller

from flask import jsonify, session, request, g

ProductController = Controller(Product, db)

@app.route('/products', methods=['GET'])
def products():
    response_object = {'status': 'success'}
    response_object['data'] = [p.json() for p in ProductController.get_many(limit=10)]
    return jsonify(response_object), 200, {'Access-Control-Allow-Origin': '*'}

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
