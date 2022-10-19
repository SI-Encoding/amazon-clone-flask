FLASK_APP=app:app

flask-init:
	python -m venv venv
	pip install -r requirements.txt

start-flask-production:
	.\venv\Scripts\activate
	python server/server.py --env "production"

start-flask-dev:
	.\venv\Scripts\activate
	python server/server.py --env "dev"

react-init:
	npm install

start-react:
	npm start

init-db:
	python server/manage.py create_db
	python server/manage.py create_test_user
	python server/manage.py create_test_product_and_order

up:
	docker-compose --env-file .env-dev up

test:
	echo $(FLASK_APP)
