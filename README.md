E-Commerce Website with a focus in technology
=============================================

This project is an e-commerce website that focuses on technology products. It includes a backend API built with ExpressJS and a frontend UI built with React. The project is containerized with Docker and uses Postgres as its database.

Set up environment
------------------

To set up the environment, follow these steps:

1.  Create a `.env` file inside the `/app/server` directory which will include the configuration variables.
2. Navigate to /client directory and run `npm install & npm run watch`
3.  Navigate to the `/app` directory and run the following command: `docker-compose up -d`.

Install dependencies
------------------
After installing the dependency app/server, run docker compose 
using the --build flag in order to re-spin the containers.

`docker-compose up -d --build`

For dependencies of app/client run `npm install`
Test app
----------

To test app, run the following command: `curl localhost:5000/<route>`. For example:

`curl localhost:5000/backend`

Access app
----------

To access the app, open `localhost:5000` in your web browser.