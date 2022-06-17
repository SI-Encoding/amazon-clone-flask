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
