from models import *
from app import *
from controller import Controller

from flask import jsonify, session, request, g

ProductController = Controller(Product, db)
UserController = Controller(User, db)
OrderController = Controller(Order, db)

@app.route('/products', methods=['GET'])
def products():
    if request.args:
        criteria = dict(request.args)
    response_object = {'status': 'success'}
    response_object['data'] = [p.json() for p in ProductController.get_many(limit=10, **criteria)]
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

@app.route('/order', methods=['GET'])
def get_order():
    response_object = {'status': 'success'}
    order_id = request.args.get('order_id')
    response_object['data'] = OrderController.get_one(id=order_id).json()
    return jsonify(response_object), 200, {'Access-Control-Allow-Origin': ''}

@app.route('/order', methods=['POST'])
def post_order():
    response_object = {'status': 'success'}
    post_data = request.get_json()
    OrderController.add_one(**post_data)
    response_object['data'] = 'Order added!'
    return jsonify(response_object), 200, {'Access-Control-Allow-Origin': ''}

@app.route('/product', methods=['GET'])
def product():
    print("a")
    response_object = {'status': 'success'}
    product_id = request.args.get('product_id')
    response_object['data'] = ProductController.get_one(id=product_id).json()
    return jsonify(response_object), 200, {'Access-Control-Allow-Origin': '*'}
  

