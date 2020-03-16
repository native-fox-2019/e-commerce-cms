# e-commerce-cms

# Deploy Link :
<!-- ## [Kanban](https://first-time-deploy-d2b3b.firebaseapp.com/#) -->

# Endpoint:
## [http://localhost:3000](http://localhost:3000)

# POST /register
## Endpoint
> /users/register

## Request body:
```
{
    email: string,
    name:string,
    password:string,
    role: string
}
```
All req.body is **required**, Role must be 'Admin'


## Response
Status 201
```
{
"access_token": "YOUR_TOKEN"
}
```
Status 400
```
{
    "message": [
        "Password cannot be empty"
    ]
}
```
Message may vary according to empty key or constraint email


Status 500
```
{
   status: 500,
   msg: "err message"
}
```

# POST /login
## Endpoint
> /users/login

## Request body:
```
{
    email: string,
    password: string
}
```
All req.body is **required**

## Response
Status 200
```
{
   access_token: "YOUR_TOKEN"
}
```
Status 400
```
{
    "message": "Wrong email or password"
}
```
Status 500
```
{
   status: 500,
   msg: "Internal Server Error"
}
```

# GET /tasks - Get All Product
## Endpoint
> /products

## Authentication:
Token (required)

## Request header: 
```
access_token: YOUR_TOKEN
```
## Response:
Status 200
```
[
    {
        id: 1,
        title: "Try To Make Kanban Documentation",
        category: "Back-Log"
        description: "Kanban Using Vue.js",
        createdAt: 2020-03-03T15:01:27.405Z,
        updatedAt: 2020-03-03T15:01:27.405Z
    }
]
```
Status 401
```
{
   status: 401,
   msg: error message
}
```
Status 403
```
{
   status: 403,
   msg: error message
}
```
Status 500
```
{ 
   status: 500,
   msg: "Internal Server Error"
}
```

# POST /tasks - Add Product
## Endpoint
> /product

## Authentication:
Token (required)

## Request header: 
```
access_token: YOUR_TOKEN
```

## Request body:
```
{
    name: string,
    image_url: string,
    price: integer,
    stock: integer
}
```
## Response
Status 201
```
{
    "data": {
        "id": 1,
        "name": "Pencil",
        "image_url": "yourimageurl.com",
        "price": 10000,
        "stock": 30,
        "updatedAt": "2020-03-16T16:43:39.953Z",
        "createdAt": "2020-03-16T16:43:39.953Z"
    }
}
```
Status 400
```
{
    "message": [
        "Name cannot be empty"
    ]
}
```
Message may vary according to empty key



Status 401
```
{
    "message": "Invalid Token"
}
```
Status 403
```
{
    "message": "Forbidden"
}
```
Status 500
```
{
   status: 500,
   msg: "Internal Server Error"
}
```

# GET /projects/:id - Get One Project
## Endpoint
> /projects/:id

## Authentication:
Token (required)

## Request header: 
```
access_token: YOUR_TOKEN
```
## Response:
Status 200
```
{
    "data": {
        "id": 1,
        "name": "Pencil",
        "image_url": "yourimageurl.com",
        "price": 10000,
        "stock": 30,
        "createdAt": "2020-03-16T16:43:39.953Z",
        "updatedAt": "2020-03-16T16:43:39.953Z"
    }
}
```
Status 401
```
{
    "message": "Invalid Token"
}
```

Status 404
```
{
    "message": "Not Found"
}
```
Status 500
```
{
   status: 500,
   msg: "Internal Server Error"
}
```

# DELETE /projects/:id - Delete Task
## Endpoint
>/projects/:id
## Authentication:
Token (required)

## Request header: 
```
access_token: YOUR_TOKEN
```
## Response:
Status 200
```
{
    1
}
```
Status 401
```
{
    "message": "Invalid Token"
}
```
Status 403
```
{
    "message": "Forbidden"
}
```
Status 404
```
{
    "message": "Not Found"
}
```
Status 500
```
{
   status: 500,
   msg: "Internal Server Error"
}
```

# PUT /projects/edit/:id - Edit Project
## Endpoint
> /projects/edit/:id

## Authentication:
Token (required)

## Request header: 
```
access_token: YOUR_TOKEN
```
## Request body:
```
{
    email: string,
    name:string,
    password:string,
    role: string
}
```
## Response:
Status 200
```
{
    "message": "Update Success"
}
```
<!-- Status 400
```
{
   status: 400,
   msg: error message
}
``` -->
Status 401
```
{
    "message": "Invalid Token"
}
```
Status 403
```
{
    "message": "Forbidden"
}
```
Status 404
```
{
    "message": "Not Found"
}
```
Status 500
```
{
   status: 500,
   msg: "Internal Server Error"
}
```