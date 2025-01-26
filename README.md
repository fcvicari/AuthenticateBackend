## Description

This project aims to study React technologies with the NextJS framework for frontend development and NodeJS with the NestJS framework for backend development.

The Neon PostgreSQL Platform offers a serverless Postgres database for developers. To use it, go to the <a href="https://neon.tech/" target="blank">Neon</a> website, create an account, set up a cluster, create a user and set the DATABASE_URL environment variable in the .env file.

## Technologies

### NestJS
A progressive Node.js framework for building efficient, reliable and scalable server-side applications.

### Prisma ORM
Next-generation Node.js and TypeScript ORM

### Postgres database
A distributed SQL database designed for speed, scale and survival.

## Installation
To install the application, you must configure the DATABASE_URL environment variable. This variable must contain the address of the application database.
This application is configured to use the database in Cockroach. If you want to change, you must reconfigure the prisma ORM.

## Running the app

```bash
# development
$ yarn start:dev

# production mode
$ yarn build
$ yarn start
```
