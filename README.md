# Car Rental project

Before you start the project make sure you have Maven, Java 17, Docker ( for easy setup of database ), Node 20.18.0 and NPM installed.

## How to start the project

#### 1. Set up the database

You may start a database with the following docker command based on the [Bitnami PostgreSQL Image](https://hub.docker.com/r/bitnami/postgresql/):

`docker run --name postgresql -p 5432:5432 -e POSTGRESQL_USERNAME=my_user -e POSTGRESQL_PASSWORD=password123 -e POSTGRESQL_DATABASE=rental bitnami/postgresql:latest`

#### 2. Start the backend

The backend was bootstrapped with [Spring initializr](https://start.spring.io/) and is configured to run against a PostgreSQL database.

Start the backend by running `./mvnw spring-boot:run`.

#### 3. Start the frontend

The frontend was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

See `package.json` for npm commands. The `package.json` has a proxy for the backend hosted at `http://localhost:8080`.

Start the frontend by doing `npm install` followed by `npm start` in the `frontend` folder
