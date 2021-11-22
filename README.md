# Toph Clothing Co. Reviews API

![Express](https://img.shields.io/badge/-Express-20232A?style=for-the-badge&logo=express&logoColor=yellow)
![postgresql](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Nginx](https://img.shields.io/badge/Nginx-009639?style=for-the-badge&logo=nginx&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white)
![AWS](https://img.shields.io/badge/Amazon_AWS-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white)
![Loader.io](https://loader.io/)

Developed by [Bishal Gautam](https://github.com/bishalkg)

A microservice RESTful API for an ecommerce web app [Toph Clothing Co.](https://github.com/hr-rfp55-toph-FEC/Project-Catwalk). The other microservices are located here: [MidnaMicroservices](https://github.com/SDC-TeamMidna)

The system was deployed onto several AWS EC2 instances, with an Nginx load balancer for 3 node servers, all quering one postgres database.

The goal of this project was to redesign the back end API service for an e-commerce web app, transforming it from a monolothic to a horizontally scalable, microservices based system architecture.

Here is the schema that I created:

<img width="892" alt="Screen Shot 2021-11-22 at 2 47 20 PM" src="https://user-images.githubusercontent.com/84740259/142946712-45b5fe91-fca6-4da3-be33-f0e602c8a943.png">


The metrics to achieve were:
  - a minimum query speed, per endpoint, of less than 100ms
  -  1000 requests per second, while maintaining 100ms response, with an error rate at most 1% under load

The metrics achieved were:
  - query speeds, per endpoint of < 10ms
  - nearly 4000 requests per second, maintaining ≤ 100ms response times and error rate ≤ 1%

Here is a sample data set that I graphed out for the /reviews/:product_id endpoint of the API:
  - of note, adding a third server did not enhance performance of this endpoint by a significant amount.

![Screen Shot 2021-11-22 at 2 55 20 PM](https://user-images.githubusercontent.com/84740259/142947304-4e5ca06f-91ac-42e7-9673-733585f3dd62.png)

### Installation
```
  npm run build
  npm start
```
