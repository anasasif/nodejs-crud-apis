# NodeJS, Express, Sequelize, Mysql 'JWT token Auth' REST API 

## Features
1. Register new user
2. Login user
3. Verify token

## API endpoints

1. `POST /api/registration`: Register new user
2. `POST /api/login`: Logs in a user
3. `GET /api/verify`: Verify token

## Body Payload
Signup expects

```js
{
    name: string,
    email: string,
    password: string,
}
```

Signin expects

```js
{
    email: string,
    password: string
}
```
## Tools
* NodeJS/Express: Server
* MySQL2: Storage
* JWT: Token based authentication
* bcryptjs: Password security
* sequelize
* sequelize-cli

## Available scripts
* `start`: Starts the server with node
* `start:dev`: Starts the server in watch mode

## Getting started

Clone it by starting your terminal

```sh
git clone git@github.com:anasasif/nodejs-sequelize-jwt-token-auth-mysql.git
```
Change to the downloaded directory with

```sh
cd nodejs-sequelize-jwt-token-auth-mysql
```

Rename the file named `.env.example` to `.env` and update the variable values with valid ones

Install the required dependencies with

```sh
npm install
```

Start the app with

```sh
npm start
```

You can also start it in watch mode with

```sh
npm run start:dev
```