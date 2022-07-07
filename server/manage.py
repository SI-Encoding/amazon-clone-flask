from flask.cli import FlaskGroup

from app import app

from models import db


cli = FlaskGroup(app)


@cli.command("create_test_user")
def create_test_user():
    from models import User
    db.session.add(User(email='randomperson@yahoo.com', password='password', mobile_number='+16041111111'))
    db.session.commit()


@cli.command("create_db")
def create_db():
    db.drop_all()
    db.create_all()
    db.session.commit()


@cli.command("create_test_product_and_order")
def create_test_product_and_order():
    from models import Product, Order, User

    user = User.query.first()

    product = Product(name='Vacuum', price=5000, description='This is a vacuum', img='img_src', discount=0,
                      categories=['appliances'], amount_sold=0, inventory=100, seller='AMZ')

    db.session.add(product)

    order = Order(user_id=user.id, products=[product])
    db.session.add(order)

    db.session.commit()


if __name__ == "__main__":
    cli()
