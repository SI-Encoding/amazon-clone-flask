from models import *
from app import *
from controller import Controller

from flask import jsonify, session, request, g
import random
from smscontroller import twilio_client
from settings import STRIPE_SECRET_KEY, PHONE_NUMBER
import stripe

ProductController = Controller(Product, db)
UserController = Controller(User, db)
OrderController = Controller(Order, db)

characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
stripe.api_key = STRIPE_SECRET_KEY

def generate_session_token():
    return "".join([random.choice(characters) for i in range(10)])


@app.route('/products', methods=['GET'])
def products():
    criteria = dict()
    if request.args:
        criteria = dict(request.args)
    response_object = {'status': 'success'}
    response_object['data'] = [p.json() for p in ProductController.get_many(limit=10, **criteria)]
    return jsonify(response_object), 200, {'Access-Control-Allow-Origin': '*'}

@app.route('/')
def index():
    return jsonify({'success': True}), 200

@app.route('/2fa', methods=['POST'])
def twoFA():
    email = request.form['email']
    
    user = User.query.filter(User.email == email).first()

    if user.session_token != request.form['session_token']:
        return jsonify({'Error': 'Session is broken.'}), 400

    sms_code = user.sms_code
    # TODO: sms_code = session.get('sms_code')
    if not sms_code:
        raise Exception("Broken")

    if request.form['sms_code'] == sms_code:
        user_id = user.id
        print(user_id)
        session['user_id'] = user_id
        first_name = user.first_name
        last_name = user.last_name
        address = user.address

        return jsonify({'Success': 'Successfully signed in as {user}.'.format(user=email), 'user_id': user_id, 'email': email, 'firstName': first_name, 'lastName': last_name, 'address': address }), 200
    else:
        return jsonify({'Error': 'SMS code is incorrect.'}), 401


def generate_sms_code():
    access_code = random.randint(10000, 99999)
    return access_code

def send_sms_code(mobile_number):
    sms_code = generate_sms_code()

    message = twilio_client.messages \
        .create(
            body="This is your access code: {access_code}".format(access_code=sms_code),
            from_=PHONE_NUMBER,
            to=mobile_number
    )

    print(message.sid)
    return sms_code

@app.before_request
def before_request():
    g.user = None

    if 'user_id' in session:
        user = User.query.filter(User.id==session['user_id']).first()
        g.user = user

@app.route('/login', methods=['POST'])
def login():
 
    email = request.form['email']
    password = request.form['password']
    
    user = User.query.filter(User.email==email).first()
    if not user:
        return jsonify({'Error': 'User {user} not found.'.format(user=email)}), 401

    if user.active == False:
        return jsonify({'Error': 'User {user} account is deactivated.'}), 401, {'Access-Control-Allow-Origin': '*'}

    if user.verify_password(password):
        mobile_number = user.mobile_number
        access_code = send_sms_code(mobile_number)

        # TODO: Figure out synchronization of backend session with front end...
        session['sms_code'] = access_code

        user.session_token = generate_session_token()
        session['session_token'] = user.session_token
        user.sms_code = session['sms_code']
        db.session.commit()

        return jsonify({'mobile_number': mobile_number, 'session_token': user.session_token})
    else:
        return jsonify({'Error': 'User {user} and password combination is incorrect.'.format(user=email)}), 401

@app.route('/order', methods=['GET'])
def get_order():
    response_object = {'status': 'success'}
    order_id = request.args.get('order_id')
    response_object['data'] = OrderController.get_one(id=order_id).json()
    return jsonify(response_object), 200, {'Access-Control-Allow-Origin': '*'}

@app.route('/orders', methods=['GET'])
def get_orders():
    response_object = {'status': 'success'}
    user_id = request.args.get('user_id')
    orders = OrderController.get_many(user_id=user_id, order_by=Order.created_date.desc)
    if orders.count() > 0:
        orders_json = []
        for order in orders:
            order_json = order.json()
            order_json['products'] = [product.json() for product in order_json['products']]
            orders_json.append(order_json)
        response_object['data'] = orders_json
    else:
        response_object['data'] = []
    return jsonify(response_object), 200, {'Access-Control-Allow-Origin': '*'}

@app.route('/order', methods=['POST'])
def post_order():
    response_object = {'status': 'success'}
    post_data = request.get_json()
    products_to_add = []
    for product_id in post_data['products']:
        product = ProductController.get_one(id=product_id)
        product.inventory-= 1
        product.amount_sold+= 1
        db.session.commit()
        products_to_add.append(product)
    OrderController.add_one(products_to_add, post_data['user_id'])
    response_object['data'] = 'Order added!'

    return jsonify(response_object), 200, {'Access-Control-Allow-Origin': '*'}

@app.route('/product', methods=['GET'])
def product():
    response_object = {'status': 'success'}
    product_id = request.args.get('product_id')
    response_object['data'] = ProductController.get_one(id=product_id).json()
    return jsonify(response_object), 200, {'Access-Control-Allow-Origin': '*'}
  
@app.route('/charge', methods=['POST'])
def create_charge():
    post_data = request.get_json()
    amount = int(post_data.get('amount'))
    charge = stripe.Charge.create(
        amount=amount,
        currency='usd',
        source=post_data.get('token'),
        description= 'Service Plan'
    )
    if charge['status'] == "succeeded":
        response_object = {
            'status': "succeeded",
            'charge': charge
        }
        return jsonify(response_object), 200, {'Access-Control-Allow-Origin': '*'}
    else:
        response_object = {
            'status': 'false',
            'charge': 0
        }
        return jsonify(response_object), 400, {'Access-Control-Allow-Origin': '*'}

@app.route('/register', methods=['POST'])
def register():
    email = request.form.get('email')
    first_name = request.form.get('first_name')
    last_name = request.form.get('last_name')
    password = request.form.get('password')
    mobile_number = request.form.get('mobile_number')
    address = request.form.get('address')

    if email and first_name and last_name and password:
        result = UserController.add_one(first_name, last_name, email, password, mobile_number, address)
        if type(result) == User:
            return jsonify({'Success': 'Successfully signed in as {user}.'.format(user=email), 'email': email, 'first_name': first_name, 'last_name': last_name, 'address': address }), 200, {'Access-Control-Allow-Origin': '*'}
        else:
            return jsonify({'Error': 'Uncaught exception.'}), 500
    else:
        return jsonify({'Error': 'You must provide all of the following: email, first_name, last_name, password, mobile_number, address.'}), 401

@app.route('/logout', methods=['POST'])
def logout():
    id = request.form.get('user_id')
    user_id = session.pop('user_id', None)
    session.pop('session_token', None)
    user = UserController.get_one(id=id)
    user.session_token = None
    db.session.commit()
    return jsonify({'Success': 'Successfully signed out'}), {'Access-Control-Allow-Origin': '*'}

@app.route('/deactivateUser', methods=['PUT'])
def deactivate():
    id = request.form.get('user_id')
    user_id = session.pop('user_id', None)
    session.pop('session_token', None)
    user = UserController.get_one(id=id)
    user.session_token = None
    user.active = False
    db.session.commit()
    return jsonify({'Success': 'Successfully deactivated'}), {'Access-Control-Allow-Origin': '*'}