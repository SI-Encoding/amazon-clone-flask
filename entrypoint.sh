#!/bin/sh

if [ "$DATABASE" = "postgres" ]
then
    echo "Waiting for postgres..."

    while ! nc -z $SQL_HOST $SQL_PORT; do
      sleep 0.1
    done

    echo "PostgreSQL started"
fi

python3 manage.py create_db
python3 manage.py create_test_user
python3 manage.py create_test_product_and_order


exec "$@"
