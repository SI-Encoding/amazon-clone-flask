from app import db

order_product_association_table = db.Table(
	"order_product_association",
	db.metadata,
	db.Column("order_id", db.ForeignKey("order.id")),
	db.Column("product_id", db.ForeignKey("product.id"))
)


class User(db.Model):
    __tablename__ = 'user'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.Text)
    password = db.Column(db.Text)
    orders = db.relationship("Order", backref='user', lazy='dynamic')

    def __init__(self, username: str, password: str, orders: list = []):
        self.username = username
        self.password = password
        self.orders = orders

    def json(self):
        return {
            'id': self.id,
            'username': self.username,
            'password': self.password,
            'orders': self.orders
        }

    def __repr__(self):
        return f'<User: {self.username}>'


class Product(db.Model):
    __tablename__ = 'product'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Text)
    price = db.Column(db.Integer)
    discount = db.Column(db.Float)
    categories = db.Column(db.ARRAY(db.Text))
    amount_sold = db.Column(db.Integer)
    description = db.Column(db.Text)
    img = db.Column(db.Text)
    inventory = db.Column(db.Integer)
    seller = db.Column(db.Text)

    def __init__(self, name: str, price: int, discount: float, categories: [str], amount_sold: int, description: str,
                 img: str, inventory: int, seller: str):
        self.name = name
        self.price = price
        self.discount = discount
        self.categories = categories
        self.amount_sold = amount_sold
        self.description = description
        self.img = img
        self.inventory = inventory
        self.seller = seller

    def json(self):
        return {
            'id': self.id,
            'name': self.name,
            'price': self.price,
            'discount': self.discount,
            'categories': self.categories,
            'amount_sold': self.amount_sold,
            'description': self.description,
            'img': self.img,
            'inventory': self.inventory,
            'seller': self.seller
        }


class Order(db.Model):
    __tablename__ = 'order'

    id = db.Column(db.Integer, primary_key=True)
    products = db.relationship("Product", secondary=order_product_association_table)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"))

    def __init__(self, products: list, user_id):
        self.products = products
        self.user_id = user_id

    def json(self):
        return {
            'id': self.id,
            'products': self.products,
            'user_id': self.user_id
        }


