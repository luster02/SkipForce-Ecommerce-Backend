[![SkipForce-Ecommerce-Backend](https://circleci.com/gh/luster02/SkipForce-Ecommerce-Backend.svg?style=svg)](https://app.circleci.com/pipelines/github/luster02/SkipForce-Ecommerce-Backend/12/workflows/6d5c6124-9062-4916-82d1-db7d4871b496/jobs/13)

# Ecommerce Backend skipForce (NestJS)

### Introduction
skipForce is an alternative to build a functional ecommerce in a simple way.

### Quick Start
#### Prerequisites

* Nodejs >=10.13.0
* Nestjs cli
* postgresql

##### Clone this repository then install dependencies


    npm install && nest update

##### Create .env file
```
PORT=[API_port]
HOST=[database_port]
USERNAME=[database_username]
PASSWORD=[database_password]
DB_TYPE=[database_type]
DB_PORT=[database_port]
DATABASE=[database_name]
JWT_SECRET=[jwt_secret_seed]
JWT_SECRET_CUSTOMER=[jwt_secret_seed]
CLOUD_NAME=[cloudinary_cloud_name]
API_KEY=[cloudinary_api_key]
API_SECRET=[cloudinary_api_secret]
STRIPE_KEY=[stripe_api_key]
```
##### Generate and run database migrations
```
npm run migration:generate <name>
npm run migration:run
```
##### Start server 
      
    npm start || npm start:dev 

#### Rest

Swagger api Explorer 

    localhost:<port>/api

#### GraphQL

Graphql playground

    localhost:<port>/graphql