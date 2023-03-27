# TechPlaza
E-Commerce Website with a focus in technology

Set up environment:
1. Create '.env' file inside /app directory which will include the configuration variables
2. cd /app
3. docker-compose --env-file .env up -d

Connect to database through 2 options
1. Through Postgres CLI
1.1 docker-compose exec my_db /bin/bash
1.2 psql --host=<db_host> --username=<db_user> --dbname=<db_name> (from .env)
1.3 Enter password for prompt (from .env)

2. Through PgAdmin (GUI)
2.1 Open localhost:8080 in your web browser
2.2 Login with email and password (from .env)
2.3 Create/Connect to server using host, user and password (from .env)

Test route
- - curl localhost:5000/<name_of_route>
For example:
- curl localhost:5000/backend

Access app
- Open 'localhost:3000' in your web browser