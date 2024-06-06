# ERP.AERO Node.js Application

## Description

This repository contains the implementation of the ERP.AERO service with REST API. The application is built using Node.js, Express, TypeScript, and MySQL, and it runs on Docker. File uploads are managed using AWS S3.

## Features
- User authentication using bearer tokens.
- Token creation and refresh functionality.
- User registration.
- File upload, listing, deletion, and download functionality.
- Pagination support for file listing.
- Secure file storage using AWS S3.
- CORS configuration for access from any domain.
- Application and database (MySQL) running on Docker.
- TypeScript for static typing and enhanced development experience.

## Environment Setup
To run this project, make sure you have the following installed on your system.

Binaries      | Version
------------- | -------------
NodeJS        |  ^20.0
NPM           | ^10.0
MySQK    | latest

## Running the app with Docker

This application can also be run using Docker. Make sure you have Docker and Docker Compose installed on your system. Then, you can use the following command to start the application:

```bash
$ docker-compose up
```
## Instaletion

Run following command for installing all the dependencies locally.

```bash
$ npm install
```

## Running the app on local environment
```bash
$ npm run start:dev
```

## Environment Variables
Put all the environment variables inside `.env` file located ats the root of the project. The list of all the environment variables is available in `.env.example` file. 



## Database Migrations
To deploy migratoin to database use the following command:

```
npm run migrate:run 
```

## API Endpoints
The following endpoints are supported:


Authentication
- /signin [POST] - Request a bearer token using ID and password.
- /signup [POST] - Register a new user.
- /refresh [POST] - Refresh the bearer token.
- /logout [POST] - Logout the user.
- /info [GET] - Get user information (Authenticated users only)

File
- /file/upload [POST] - Upload a new file and save its metadata in the database.
- /file/list [GET] - List files with pagination.
- /file/delete/ [DELETE] - Delete a file from the database and S3.
- /file/ [GET] - Retrieve metadata for a specific file.
-  /file/update/ [PUT] - Update a file in the database and S3.

## Testing
Postman - You can use Postman to test the API endpoints. The Postman collection is available in the `nest-stack.postman_collection.json` file.
- postman_collection.json
