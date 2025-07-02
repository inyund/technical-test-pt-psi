# Backend Technical Test - PT PSI

## Overview

This repository contains the backend implementation for the technical test. It's an e-commerce API built with Node.js, PostgreSQL, and Prisma ORM.

## Technologies Used

- **Runtime**: Node.js
- **Database**: PostgreSQL
- **ORM**: Prisma
- **API Documentation**: Swagger UI

## Prerequisites

- Node.js (v16 or higher)
- Yarn package manager
- PostgreSQL database
- Prisma CLI (included in dependencies)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/inyund/technical-test-pt-psi-be.git
cd technical-test-pt-psi-be
```

## Configuration

1. Create database in PostgreSQL
2. Adjust .env file to your environment

```bash
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=postgres
DATABASE_NAME=technical-test-pt-psi
DATABASE_URL="postgresql://${DATABASE_USER}:${DATABASE_PASSWORD}@${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE_NAME}"
```

## Database Setup

1. Run database migrations :

```bash
  yarn prisma migrate dev
```

2. Seed initial data ;

```bash
yarn prisma db seed
```

## Running the application

Start the development server:

```bash
yarn start:dev
```

The server will run at: http://localhost:8080/api

## API Documentation

Access interactive API documentation at:
http://localhost:8080/api-docs#/

## AUTH Feature

Testing the auth feature:

1. Access http://localhost:8080/auth/google on your browser
2. Login using google credential

the authentication should redirect you back to endpoint profile and giving the desired response.
