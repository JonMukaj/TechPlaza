E-Commerce Website with a focus in technology
=============================================

This project is an e-commerce website that focuses on technology products. It includes a backend API built with ExpressJS and a frontend UI built with React. The project is containerized with Docker and uses Postgres as its database.

Set up environment
------------------

To set up the environment, follow these steps:

1.  Create a `.env` file inside the `/app` directory which will include the configuration variables.
2.  Navigate to the `/app` directory and run the following command: `docker-compose --env-file .env up -d`.

Install dependencies
------------------
After installing the dependency in app/client or app/server, run docker compose 
using the --build flag in order to re-spin the containers.

`docker-compose --env-file .env up -d --build`

Test route
----------

To test a route, run the following command: `curl localhost:5000/<name_of_route>`. For example:

`curl localhost:5000/backend`

Access app
----------

To access the app, open `localhost:3000` in your web browser.