# Nodejs CRUD API's

## Features
1. User Regisration
2. Login user
3. Create User
4. Update User
5. Get User by id
6. Delete User by id
7. Create New Post
8. Get post by id
9. Update post by id
10. Delete post by id
11. Get all posts
12. Create a comment on a post
13. Get all comments on a post

## API endpoints


```js

Registration

1. `POST /api/registration`: Register new user

Login

1. `POST /api/login`: Logs in a user

Users

1. `POST /api/users`: Create  new user
2. `GET /api/users/1`: Get user by id
3. `PUT /api/users/1`: Update user by id
4. `DELETE /api/users/1`: Delete user by id

Posts

1. `POST /api/posts`: Create new post with reference to `user_id`
2. `GET /api/posts/1`: Get post by id
3. `GET /api/posts`: Get all post including user.name and user.email
4. `PUT /api/posts/1`: Update post by id
5. `DELETE /api/posts/1`: Delete post by id

Comments

1. `POST /api/comments/1`: Create new comment on a post reference with `post_id` and `user_id`
2. `GET /api/comments/1`: Get all comments on a post including user.name and user.email


```


## Body Payload



```js

Registration expects

{
    email: string,
    password: string,
}

Login expects

{
    email: string,
    password: string,
}

User expects

{
    name: string,
    email: string,
    password: string,
}

Posts expects

{
    title: string,
    content: string,
    tags: string array comma seperated
}

Comments expects

{ 
    content: string
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
git clone git@github.com:anasasif/nodejs-crud-apis.git
```
Change to the downloaded directory with

```sh
cd nodejs-crud-apis
```

Rename the file named `.env.example` to `.env` and update the variable values with valid ones

Install the required dependencies with

```sh
yarn install
```

Create DB and run migrations

```sh
npx sequelize-cli db:create
sequelize db:migrate
```

Start the app with

```sh
yarn start
```

You can also start it in watch mode with

```sh
npm run start:dev
```