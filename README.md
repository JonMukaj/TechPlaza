E-Commerce Website with a focus in technology
=============================================

This project is an e-commerce website that focuses on technology products. It includes a backend API built with ExpressJS and a frontend UI built with React. The project is containerized with Docker and uses Postgres as its database.

Set up environment
------------------

To set up the environment, follow these steps:

1.  Create a `.env` file inside the `/app` directory which will include the configuration variables.
2.  Navigate to the `/app` directory and run the following command: `docker-compose --env-file .env up -d`.

Connect to database
-------------------

There are two options to connect to the database:

### Option 1: Through Postgres CLI

1.  Execute the following command: `docker-compose exec my_db /bin/bash`.
2.  Run the command `psql --host=<db_host> --username=<db_user> --dbname=<db_name>` (from `.env`).
3.  Enter the password for the prompt (from `.env`).

### Option 2: Through PgAdmin (GUI)

1.  Open `localhost:8080` in your web browser.
2.  Login with your email and password (from `.env`).
3.  Create/connect to a server using the host, user, and password (from `.env`).

Test route
----------

To test a route, run the following command: `curl localhost:5000/<name_of_route>`. For example:

bashCopy code

`curl localhost:5000/backend`

Access app
----------

To access the app, open `localhost:3000` in your web browser.