# e-commerce-cms

# Deploy Link :
## [fznakbar e-commerce-cms](https://fznakbar-e-commerce-cms.firebaseapp.com/login)
For login, use this account :

email : fauzan@admin.com

password : 1234


# Endpoint:
## [http://localhost:3000](http://localhost:3000)

# POST /register
## Endpoint
> /users/registeradmin

## Request body:
```
{
    email: string,
    name:string,
    password:string,
    superpassword:'password1234'
}
```
All req.body is **required**, superpassword have to be 'password1234'


## Response
Status 201
```
{
"name": "YOUR_NAME"
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

Status 403
```
{
    "message": [
        "Forbidden"
    ]
}
```



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
   access_token: "YOUR_TOKEN",
   name : "YOUR_NAME"
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

# GET /products - Get All Product
## Endpoint
> /products

## Authentication:
Admin Token (required)

## Request header: 
```
access_token: YOUR_TOKEN
```
## Response:
Status 200
```
"data": [
            {
                "id": 1,
                "name": "Crankshaft",
                "image_url": "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full/MTA-5112070/faito_faito-racing-struk-up-crankshaft-kruk-as-motor-for-kawasaki-ksr110--3-0-mm-_full02.jpg",
                "price": 450000,
                "stock": 10,
                "createdAt": "2020-03-21T01:34:05.910Z",
                "updatedAt": "2020-03-21T01:34:05.910Z"
            },
            {
                .
                .
            }
        ]
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

# POST /products - Add Product
## Endpoint
> /products

## Authentication:
Admin Token (required)

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
        "name": "Headlamp",
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

# GET /products/:id - Get One Project
## Endpoint
> /products/:id

## Authentication:
Admin Token (required)

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
        "name": "Headlamp",
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

# DELETE /products/:id - Delete Task
## Endpoint
>/products/:id
## Authentication:
Admin Token (required)

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

# PUT /products/:id - Edit Project
## Endpoint
> /products/:id

## Authentication:
Admin Token (required)

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