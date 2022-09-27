from flask import Flask, g, session, jsonify
from flask_cors import CORS

from controller import *


def create_app1(settings):
    app = Flask('app')

    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SQLALCHEMY_DATABASE_URI'] = f"postgresql://{settings.PGUSER}:{settings.PGPASS}@{settings.PGHOST}/{settings.PGDB}"
    app.config.update(SESSION_COOKIE_SAMESITE="None", SESSION_COOKIE_SECURE=True)

    db.init_app(app)

    with app.app_context():
        Base.metadata.create_all(db.engine)
        Reflected.prepare(db.engine)
        Base.query = db.session.query_property()

    app.secret_key = settings.SECRET_KEY
    CORS(app)
    cors = CORS(app, resource={
        r"/*": {
            "origins": "*"
        }
    })


    from views.users import users
    from views.store import store

    app.register_blueprint(users)
    app.register_blueprint(store)

    from twilio.rest import Client
    import stripe

    stripe.api_key = settings.STRIPE_SECRET_KEY

    @app.route('/')
    def index():
        return jsonify({'success': True}), 200

    @app.before_request
    def before_request():
        g.user = None
        g.DEBUG = settings.DEBUG
        g.twilio_client = Client(settings.TWILIO_ACCOUNT_SID, settings.TWILIO_AUTH_TOKEN)
        g.stripe = stripe

        if 'user_id' in session:
            user = User.query.filter(User.id == session['user_id']).first()
            g.user = user

    return app, db

