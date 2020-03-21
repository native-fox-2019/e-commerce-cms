# e-commerce-cms 

Link Hosting: 

```
https://ecomm-cms.firebaseapp.com/
```

Link Server :

```
https://shrouded-badlands-50874.herokuapp.com
```

#### Before you do anything else..

```
$ npm install
```



## .ENV Tempelates

```
SECRET=""
```



## Tools web app

- Postgres 
- Sequelize 
- Vue js
- Express



## Main Routes Todos

|  Routes   |
| :-------: |
| /products |



## Todos Routes

| Routes  | Method | Body                                                         |      | Descriptions                          |
| ------- | ------ | ------------------------------------------------------------ | ---- | ------------------------------------- |
| /       | get    |                                                              |      | returns all products list             |
| /       | post   | title:<string><br/> status:<string><br/> description:<string><br/> |      | Create Products                       |
| /:id    | get    |                                                              |      | returns a Products based on params id |
| /:patch | put    | Category:<string><br>                                        |      | update a Products                     |
| /:id    | delete |                                                              |      | delete based on params id             |



## Main Routes Users

| Routes |      |
| ------ | ---- |
| /users |      |



## Users Routes

| Routes    | Method | Descriptions                                                 |
| --------- | ------ | ------------------------------------------------------------ |
| /register | post   | register user with username (string)<br> email (string)<br>email(string)<br> |
| /login    | post   | login user data form email(string)<br> password(string)      |
|           |        |                                                              |

# Middlewares

This app uses 2 middlewares **Authentication** and **ErrorHandler**



### Postman API Documentasi :

```
https://documenter.getpostman.com/view/3757275/SzKVQJBv
```

