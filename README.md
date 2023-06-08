E-Commerce Website with a focus in technology
=============================================

This project is an e-commerce website that focuses on technology products done in the context of **CEN 302 Software Engineering Course** . It includes a backend API built with ExpressJS and a frontend UI built with React. The project is containerized with Docker and uses Postgres as its database.

Set up development environment
------------------

To set up the environment, follow these steps:

1.  Rename `.template-env` to `.env` inside the `/app/server` directory and populate it with  all the required configuration variables.
2. Navigate to `/app/client` directory and run `npm install & npm run watch`
3.  Navigate to the `/app` directory and run the following command: `docker-compose up -d`.

Install dependencies
------------------
After installing the dependency app/server, run docker compose 
using the --build flag in order to re-spin the containers.

`docker-compose up -d --build`

For dependencies of app/client just run `npm install`

Access app
----------

To access the app, open `localhost:5000` in your web browser.


Database Migration
----------

To migrate the db of TechPlaza to your PostgreSQL server instance, follow the instructions on
the link below to restore it using PgAdmin UI. Be careful to enable the options "Owner" and "Privileges"
in the "Do not save" section of "Data/Objects" tab. 

https://www.pgadmin.org/docs/pgadmin4/development/restore_dialog.html 

The database dump is located in `/app/server/db_migration` directory of the repository.


Project Documentation
----------
In the `/documentation` directory, you can find all the documents, wikia, schemas, diagrams and information related to the project.


Infrastructure
----------
In the `/infra` directory, you can find and use terraform modules for provisioning resources in Azure for the staging and production environment.