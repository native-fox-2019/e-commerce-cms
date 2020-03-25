## E-Commerce CMS
### by Darindra R

# GET /products
### Get All Products
## Endpoint
> https://jadilapak.herokuapp.com/products

## Authentication:
Token (required)

## Request header: 
```
token: YOUR_TOKEN
```
## Success Response :
Status 200
```
[
    {
        "id": 1,
        "name": "Bakwan",
        "image_url": "http://example.com",
        "price": "2000",
        "Stock": 5,
        "createdAt": "2020-03-12T14:36:23.789Z",
        "updatedAt": "2020-03-12T14:36:23.789Z"
    }
]
```
## Error Response :
Status 401
```
{
    "name": "JsonWebTokenError",
    "message": "invalid token"
}
```
Status 403
```
{
    "name": "JsonWebTokenError",
    "message": "jwt must be provided"
}
```
Status 500
```
{
   msg: "Internal Server Error"
}
```
# POST /products
### Create A Product
## Endpoint
> https://jadilapak.herokuapp.com/products



## Authentication:
Token (required)

## Request header: 
```
token: YOUR_TOKEN 
```

## Request body:
```
{
    name: String
    image_url: String,
    price: Integer,
    stock: Integer
}
```
#### All Request Body is **REQUIRED**
## Success Response :
Status 201
```
{
    "Message": "Product succesfully created.",
    "Data": {
        "id": 1,
        "name": "Bakwan",
        "image_url": "http://example.com",
        "price": "2000",
        "Stock": 5
    }
}
```
## Error Response :
Status 400
```
[
   {
      "message": "Input Cannot Be Empty",
      "type": "Validation error",
    }
]
```
Status 401
```
{
    "name": "JsonWebTokenError",
    "message": "invalid token"
}
```
Status 403
```
{
    "message": "Forbidden access role not admin."
}
```
Status 403
```
{
    "name": "JsonWebTokenError",
    "message": "jwt must be provided"
}
```
Status 500
```
{
   msg: "Internal Server Error"
}
```
# GET /products/:id
### Get Products By ID
## Endpoint
> https://jadilapak.herokuapp.com/products/:id

## Authentication:
Token (required)

## Request header: 
```
token: YOUR_TOKEN
```
## Success Response :
Status 200
```
{
    "id": 1,
    "name": "Bakwan",
    "image_url": "http://example.com",
    "price": "2000",
    "Stock": 5,
    "createdAt": "2020-03-12T14:36:23.789Z",
    "updatedAt": "2020-03-12T14:36:23.789Z"
}
```
## Error Response :
Status 401
```
{
    "name": "JsonWebTokenError",
    "message": "invalid token"
}
```
Status 403
```
{
    "message": "Forbidden access role not admin."
}
```
Status 403
```
{
    "name": "JsonWebTokenError",
    "message": "jwt must be provided"
}
```
Status 404
```
{
   msg: "Data Not Found"
}
```
Status 500
```
{
   msg: "Internal Server Error"
}
```


# PUT /products/:id
### Update Products By ID
## Endpoint
> https://jadilapak.herokuapp.com/products/:id

## Authentication:
Token (required)

## Request header: 
```
token: YOUR_TOKEN
```
## Request body:
```
{
    name: String
    image_url: String,
    price: Integer,
    stock: Integer
}
```
#### All Request Body is **REQUIRED**
## Success Response :
Status 200
```
{
    "Message": "Products succesfully updated",
    "Data": {
        "id": 1,
        "name": "Bakwan",
        "image_url": "http://example.com",
        "price": "2000",
        "Stock": 5
    }
}
```
## Error Response :
Status 400
```
[
   {
      "message": "Input Cannot Be Empty",
      "type": "Validation error",
    }
]
```
Status 401
```
{
    "name": "JsonWebTokenError",
    "message": "invalid token"
}
```
Status 403
```
{
    "message": "Forbidden access role not admin."
}
```
Status 403
```
{
    "name": "JsonWebTokenError",
    "message": "jwt must be provided"
}
```
Status 404
```
{
   msg: "Data Not Found"
}
```
Status 500
```
{
   msg: "Internal Server Error"
}
```


# DELETE /products/:id
### Delete Products From Todo List
## Endpoint
> https://jadilapak.herokuapp.com/products/:id
## Authentication:
Token (required)

## Request header: 
```
token: YOUR_TOKEN
```
## Succes Response :
Status 200
```
{
    "Message": "Products successfuly deleted",
}
```
## Error Response :
Status 401
```
{
    "name": "JsonWebTokenError",
    "message": "invalid token"
}
```
Status 403
```
{
    "name": "JsonWebTokenError",
    "message": "jwt must be provided"
}
```
Status 404
```
{
   msg: "Data Not Found"
}
```
Status 500
```
{
   msg: "Internal Server Error"
}
```


# POST /user/register
### Register User
## Endpoint
> https://jadilapak.herokuapp.com/user/register

## Request body:
```
{
    name: string,
    email: string,
    password: string,
    role: string
}
```
All Request Body is **REQUIRED**

## Success Response :
Status 201
```
{
    token: "YOUR TOKEN",
    name: "YOUR NAME"
}
```
## Error Response :
Status 400
```
[
   {
      "message": "Input Cannot Be Empty",
      "type": "Validation error",
    }
]
```
Status 500
```
{
   msg: "Internal Server Error"
}
```


# POST /user/login
### Login User
## Endpoint
> https://jadilapak.herokuapp.com/user/login
## Request body:
```
{
    email: string,
    password: string
}
```
All Request Body is **REQUIRED**

## Success Response
Status 200
```
{
   token: "YOUR TOKEN",
   name: "YOUR NAME"
}
```
## Error Response
Status 400
```
{
     "message": "Bad Request"
}
```
Status 500
```
{
   msg: "Internal Server Error"
}
