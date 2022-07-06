import os
from os.path import join, dirname
from dotenv import load_dotenv

dotenv_path = join(dirname(__file__), '../.env')
load_dotenv(dotenv_path)

PGUSER = os.environ.get("PGUSER")
PGPASS = os.environ.get("PGPASS")
PGHOST = os.environ.get("PGHOST")
PGDB = os.environ.get("PGDB")

SECRET_KEY = os.environ.get("SECRET_KEY")

TWILIO_ACCOUNT_SID = os.environ.get("TWILIO_ACCOUNT_SID")
TWILIO_AUTH_TOKEN = os.environ.get('TWILIO_AUTH_TOKEN')

STRIPE_PUBLISHABLE_KEY = os.environ.get('STRIPE_PUBLISHABLE_KEY')
STRIPE_SECRET_KEY = os.environ.get('STRIPE_SECRET_KEY')
