""""""
from flask import jsonify, request, Blueprint, g

from controller import OrderController, ProductController

store = Blueprint('store', __name__, url_prefix='/')


@store.route('/products', methods=['GET'])
def products():
    criteria = dict()
    if request.args:
        criteria = dict(request.args)
    response_object = {'status': 'success'}
    response_object['data'] = [p.json() for p in ProductController.get_many(limit=10, **criteria)]
    return jsonify(response_object), 200, {'Access-Control-Allow-Origin': '*'}


@store.route('/order', methods=['GET'])
def get_order():
    response_object = {'status': 'success'}
    order_id = request.args.get('order_id')
    response_object['data'] = OrderController.get_one(id=order_id).json()
    return jsonify(response_object), 200, {'Access-Control-Allow-Origin': '*'}


@store.route('/orders', methods=['GET'])
def get_orders():
    response_object = {'status': 'success'}
    user_id = request.args.get('user_id')
    orders = OrderController.get_many(user_id=user_id, order_by=OrderController.model.created_date.desc)
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


@store.route('/order', methods=['POST'])
def post_order():
    response_object = {'status': 'success'}
    post_data = request.get_json()
    products_to_add = []
    for product_id in post_data['products']:
        product = ProductController.get_one(id=product_id)
        product.inventory -= 1
        product.amount_sold += 1
        ProductController.db.session.commit()
        products_to_add.append(product)
    OrderController.add_one(products_to_add, post_data['user_id'])
    response_object['data'] = 'Order added!'

    return jsonify(response_object), 200, {'Access-Control-Allow-Origin': '*'}


@store.route('/product', methods=['GET'])
def product():
    response_object = {'status': 'success'}
    product_id = request.args.get('product_id')
    response_object['data'] = ProductController.get_one(id=product_id).json()
    return jsonify(response_object), 200, {'Access-Control-Allow-Origin': '*'}


@store.route('/charge', methods=['POST'])
def create_charge():
    post_data = request.get_json()
    amount = int(post_data.get('amount'))
    charge = g.stripe.Charge.create(
        amount=amount,
        currency='usd',
        source=post_data.get('token'),
        description='Service Plan'
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
