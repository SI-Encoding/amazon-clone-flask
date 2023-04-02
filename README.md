# Amazon-clone
This is an web application done using React and Flask.

## Installation without Docker
1. `Make flask-init` to initialize the Flask server.
2. `Make init-db` to create the database and tables.
3. `Make start-flask-dev` to run the Flask server.
4. `Make react-init` to initialize the React app.
5. `Make start-react-dev` to run the React app.

## Note: The flask_script repository is no longer maintained and so we had three alternatives:
1. Use flask-cli (which we were originally using but it was not working for us).
2. Downgrade Flask, which does not seem ideal.
3. Modify one line of the package code directly (not ideal, very hacky, but for now it works).
4. Fork the repo and work on it ourselves to keep it up to date (which we may end up doing down the line).

## To deploy the entire thing (via four integrated Docker containers):
1. `docker-compose up`

docker-compose up --build --force-recreate
### How to install the needed dependencies

1. pip install virtualenv
2. Create your own virtual environment
    a. For Windows, run "virtualenv <YOUR_ENV_NAME>"
    b. For iOS, run "python -m venv <YOUR_ENV_NAME>"
    c. For Linux, run "python -m venv <YOUR_ENV_NAME>"
3. Run the virtual environment
    a. For Windows, run ".\<YOUR_ENV_NAME>\Scripts\activate"
    b. For iOS, run "source <YOUR_ENV_NAME>/bin/activate"
    c. For Linux, run "source <YOUR_ENV_NAME>/bin/activate"
4. To install run "pip install -r requirements.txt"
docker run -e TWILIO_ACCOUNT_SID=<YOUR_ACCOUNT_SID> -e TWILIO_AUTH_TOKEN=<YOUR_AUTH_TOKEN> --rm -p 5000:5000 amazon-clone-flask-api
### Creating the database

1. Follow tutorial on https://medium.com/@dan.chiniara/installing-postgresql-for-windows-7ec8145698e3#:~:text=Graphical%20Installer%3A%20Postgres.app,and%20database.&text=Mac%20users%2C%20you're%20all%20set!
2. Rename env-example to .env, and fill in the values.
3. To create the database, for example, on Ubuntu run "sudo -u postgres psql -c 'create database {db_name};'" 
4. If it throws error 'sudo: psql: command not found' then run 'sudo apt-get install postgresql-client'

sudo service postgresql status

$ sudo -u postgres createuser --interactive
Enter name of role to add: myuser
Shall the new role be a superuser? (y/n) n
Shall the new role be allowed to create databases? (y/n) n
Shall the new role be allowed to create more new roles? (y/n) n

$ sudo -u postgres createdb mydatabase
$ sudo -u postgres psql
psql (13.5)
Type "help" for help.

postgres=# GRANT ALL PRIVILEGES ON DATABASE mydatabase TO myuser;

ALTER USER myuser WITH PASSWORD 'new_password';

## Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Available Scripts

In the project directory, you can run:

#### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

#### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

#### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

#### Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
