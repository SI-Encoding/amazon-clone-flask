import os
from os.path import join, dirname
from dotenv import load_dotenv



class Settings:
    def __init__(self, env: str = 'dev', testing: bool=False):
        dotenv_path = join(dirname(__file__), f"../.env-{'dev' if env == 'dev' else 'production'}")
        load_dotenv(dotenv_path)

        self.testing = testing
        
        self.PGUSER = os.environ.get("PGUSER")
        self.PGPASS = os.environ.get("PGPASS")
        self.PGHOST = os.environ.get("PGHOST")
        self.PGDB = os.environ.get("PGDB")

        self.SECRET_KEY = os.environ.get("SECRET_KEY")

        self.TWILIO_ACCOUNT_SID = os.environ.get("TWILIO_ACCOUNT_SID")
        self.TWILIO_AUTH_TOKEN = os.environ.get('TWILIO_AUTH_TOKEN')

        self.STRIPE_PUBLISHABLE_KEY = os.environ.get('STRIPE_PUBLISHABLE_KEY')
        self.STRIPE_SECRET_KEY = os.environ.get('STRIPE_SECRET_KEY')

        self.MY_PHONE_NUMBER = os.environ.get('MY_PHONE_NUMBER')
        self.PHONE_NUMBER = os.environ.get('PHONE_NUMBER')

        self.DEBUG = os.environ.get('DEBUG')
