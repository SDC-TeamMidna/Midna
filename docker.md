  ```bash
    Docker ps

    Docker stop <containerID> <containerID2> …. -t 0
    Docker rm <> <>
    Docker rmi <> <> 		- to remove images


    docker compose up -d 		- use docker-compose.yml file to compose images with a network
    Docker compose up --build -d  - updates image if changes were made on either side
    Docker compose down


    psql -U bishalgautam	- the username you set in db env file, it auto created a user and a database with name


    docker commit <container-id> postgresop:v1         -> commit a container as an image
    docker tag firstimage YOUR_DOCKERHUB_NAME/firstimage
    Docker push YOUR_DOCKERHUB_NAME/firstimage


    docker stack deploy -c docker-compose.yml swarmnodeapp
    docker stack rm swarmnodeapp


    Docker compose build 		→ with .yml file
Docker compose down



 db:
   image: 'postgres'
   ports:
     - '5432:5432'
   volumes:
     - ./dbdump:/docker-entrypoint-initdb.d
   environment:
     POSTGRES_PASSWORD: password123
     POSTGRES_USER: 'bishalgautam'

Create a dump file and place it in entry point upon initialization of db

Nginx load balancer viewer?
Docker scale on terminal

Docker compose up --scale server1=3

  ```