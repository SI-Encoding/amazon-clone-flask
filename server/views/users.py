""""""
from flask import jsonify, session, request, g, Blueprint
import random

from controller import UserController

characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"

def generate_session_token(): return ''.join([random.choice(characters) for i in range(10)])

users = Blueprint('users', __name__, url_prefix='/')

@users.route('/2fa', methods=['POST'])
def twoFA():
    email = request.form['email']

    user = UserController.get_one(email=email)

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

    message = g.twilio_client.messages \
        .create(
            body=f"This is your access code: {sms_code}",
            from_=g.PHONE_NUMBER,
            to=mobile_number
    )

    print(message.sid)
    return sms_code


@users.route('/login', methods=['POST'])
def login():
    email = request.form['email']
    password = request.form['password']

    user = UserController.get_one(email=email)
    if not user:
        return jsonify({'Error': 'User {user} not found.'.format(user=email)}), 401

    if user.active == False:
        return jsonify({'Error': 'User {user} account is deactivated.'}), 401, {'Access-Control-Allow-Origin': '*'}

    if user.verify_password(password):
        mobile_number = user.mobile_number
        access_code = 'DEBUG' if g.DEBUG else send_sms_code(mobile_number)

        # TODO: Figure out synchronization of backend session with front end...
        session['sms_code'] = access_code

        user.session_token = generate_session_token()
        session['session_token'] = user.session_token
        user.sms_code = session['sms_code']
        UserController.db.session.commit()

        return jsonify({'mobile_number': mobile_number, 'session_token': user.session_token})
    else:
        return jsonify({'Error': 'User {user} and password combination is incorrect.'.format(user=email)}), 401


@users.route('/register', methods=['POST'])
def register():
    email = request.form.get('email')
    first_name = request.form.get('first_name')
    last_name = request.form.get('last_name')
    password = request.form.get('password')
    mobile_number = request.form.get('mobile_number')
    address = request.form.get('address')

    if email and first_name and last_name and password:
        result = UserController.add_one(first_name, last_name, email, password, mobile_number, address)
        if type(result).__name__ == 'User':
            return jsonify({'Success': 'Successfully signed in as {user}.'.format(user=email), 'email': email,
                            'first_name': first_name, 'last_name': last_name, 'address': address}), 200, {
                       'Access-Control-Allow-Origin': '*'}
        else:
            return jsonify({'Error': 'Uncaught exception.'}), 500
    else:
        return jsonify({
                           'Error': 'You must provide all of the following: email, first_name, last_name, password, mobile_number, address.'}), 401


@users.route('/logout', methods=['POST'])
def logout():
    id = request.form.get('user_id')
    user_id = session.pop('user_id', None)
    session.pop('session_token', None)
    user = UserController.get_one(id=id)
    user.session_token = None
    UserController.db.session.commit()
    return jsonify({'Success': 'Successfully signed out'}), {'Access-Control-Allow-Origin': '*'}


@users.route('/deactivateUser', methods=['PUT'])
def deactivate():
    id = request.form.get('user_id')
    user_id = session.pop('user_id', None)
    session.pop('session_token', None)
    user = UserController.get_one(id=id)
    user.session_token = None
    user.active = False
    UserController.db.session.commit()
    return jsonify({'Success': 'Successfully deactivated'}), {'Access-Control-Allow-Origin': '*'}
