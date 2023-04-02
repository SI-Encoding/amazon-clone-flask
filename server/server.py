from settings import Settings

from app import create_app1

if __name__ == "__main__":
    import argparse

    parser = argparse.ArgumentParser(description='Process some integers.')
    parser.add_argument('--env', default='dev')

    settings = Settings(env=parser.parse_args().env)
    app, db = create_app1(settings=settings)
    app.run(port=5000, debug=settings.DEBUG)

