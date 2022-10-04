from settings import Settings
import argparse

parser = argparse.ArgumentParser(description='Process some integers.')
parser.add_argument('--env', default='dev')

settings = Settings(env=parser.parse_args().env)

from app import create_app1

if __name__ == "__main__":
    app = create_app1(settings)[0]
    app.run(port=5000, debug=settings.DEBUG)

