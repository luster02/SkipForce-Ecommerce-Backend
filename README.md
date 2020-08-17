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


##### Create orm config file and config with next: 
```
{
  "type": "database_type",
  "username": "database_username",
  "password": "database_password",
  "host": "localhost",
  "port": 5432,
  "database": "database_name",
  "entities": ["src/**/**/*.entity{.ts,.js}"],
  "migrations": ["src/database/migrations/*{.ts,.js}"],
  "cli": {
    "migrationsDir": "src/database/migrations"
  }
}
```
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