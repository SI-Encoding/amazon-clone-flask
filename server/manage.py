import unittest

from flask_script import Manager

from app import create_app1
from settings import Settings

settings = Settings()

app, db = create_app1(settings)

app.app_context().push()

manager = Manager(app)

@manager.command
def create_db():
    #db.metadata.drop_all(bind=db.engine)#, tables=[User.__table__]
    from models import order_product_association_table, Product, Order, User
    db.create_all()
    db.session.commit()
    db.metadata.drop_all(bind=db.engine, tables=[order_product_association_table, Order.__table__, User.__table__, Product.__table__])
    db.create_all()
    db.session.commit()

@manager.command
def create_test_user():
    from models import User
    db.session.add(User(first_name = "first", last_name = "last", email='123@m.com', password='123', mobile_number=settings.MY_PHONE_NUMBER, address= "City YTR937"))
    db.session.commit()

@manager.command
def create_test_product_and_order():
    from models import Product, Order, User

    user = User.query.first()

    product = Product(name='Vacuum', price=5000, description='This is a vacuum', img='amazon-product-vacuum.jpg', discount=0,
                      categories=['appliances'], amount_sold=0, inventory=100, seller='AMZ')

    db.session.add(product)

    order = Order(user_id=user.id, products=[product])
    db.session.add(order)

    db.session.commit()

@manager.command
def run():
    app.run()

@manager.command
def test():
    """Runs the unit tests."""
    tests = unittest.TestLoader().discover('app/test', pattern='test*.py')
    result = unittest.TextTestRunner(verbosity=2).run(tests)
    if result.wasSuccessful():
        return 0
    return 1

if __name__ == '__main__':
    manager.run()