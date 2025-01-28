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

## Future Implementations

To enhance the project's functionality and user experience, the following features could be added:

1. **Email Sending for User Actions**:  
   Implement email notifications for key actions, such as:  
   - Confirming user registration.  
   - Supporting the "Forgot Password" process to reset user credentials.

2. **Email Template Utilization**:  
   Introduce customizable email templates to ensure consistency in communication, improve efficiency, and provide a professional appearance for all automated emails.

These improvements would strengthen the platform's reliability and overall usability.
