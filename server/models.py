from flask_sqlalchemy import *
from sqlalchemy import *
from sqlalchemy.dialects.postgresql import ARRAY
from sqlalchemy.ext.declarative import DeferredReflection
from sqlalchemy.orm import relationship
from werkzeug.security import generate_password_hash, check_password_hash
import datetime

class Reflected(DeferredReflection):
    __abstract__ = True

Base = declarative_base()

order_product_association_table = Table(
	"order_product_association",
	Base.metadata,
	Column("order_id", ForeignKey("order.id", ondelete="CASCADE")),
	Column("product_id", ForeignKey("product.id", ondelete="CASCADE"))
)

class User(Reflected, Base):
    __tablename__ = 'user'

    id = Column(Integer, primary_key=True)
    email = Column(Text)
    password = Column(Text)
    mobile_number = Column(Text)
    session_token = Column(Text)
    sms_code = Column(Text)
    first_name = Column(Text)
    last_name = Column(Text)
    address = Column(Text)
    orders = relationship("Order", backref='user', lazy='dynamic', cascade="all,delete")
    active = Column(Boolean)

    def __init__(self, first_name: str, last_name: str, email: str, password: str, mobile_number: str, address: str, orders: list = []):
        self.first_name = first_name
        self.last_name = last_name
        self.email = email
        self.password = generate_password_hash(password)
        self.mobile_number = mobile_number
        self.orders = orders
        self.address = address
        self.session_token = ""
        self.sms_code = ""
        self.active = True

    def json(self):
        return {
            'id': self.id,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'email': self.email,
            'password': self.password,
            'mobile_number': self.mobile_number,
            'orders': self.orders,
            'session_token': self.session_token,
            'sms_code': self.sms_code,
            'address': self.address,
            'active': self.active
        }

    def __repr__(self):
        return f'<User: {self.username}>'

    def verify_password(self, pwd):
        print(pwd, self.password)
        print(type(pwd))
        val = check_password_hash(self.password, pwd)
        print(val)
        return val

class Product(Reflected, Base):
    __tablename__ = 'product'

    id = Column(Integer, primary_key=True)
    name = Column(Text)
    price = Column(Integer)
    discount = Column(Float)
    categories = Column(ARRAY(Text))
    amount_sold = Column(Integer)
    description = Column(Text)
    img = Column(Text)
    inventory = Column(Integer)
    seller = Column(Text)

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


class Order(Reflected, Base):
    __tablename__ = 'order'

    id = Column(Integer, primary_key=True)
    products = relationship("Product", secondary=order_product_association_table, cascade="all,delete")
    user_id = Column(Integer, ForeignKey("user.id", ondelete="CASCADE"))
    created_date = Column(DateTime, default=datetime.datetime.utcnow)
    total = Column(Integer)

    def __init__(self, products: list, user_id):
        self.products = products
        self.user_id = user_id
        self.total = sum(p.price for p in products)

    def json(self):
        return {
            'id': self.id,
            'products': self.products,
            'user_id': self.user_id,
            'total': self.total,
            'created_date': self.created_date
        }


