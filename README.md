## E-Commerce CMS
### by Erry Satrio

for more detail can see this documentation made with POSTMAN
https://web.postman.co/collections/10566542-72257a31-c704-44d8-bbe9-e1b5f85ea391/publish?version=latest&workspace=d1851e39-f425-4335-8601-b09bf8498bbc

# GET /user
### Get All Products
## Endpoint
> https://secure-eyrie-18193.herokuapp.com/user

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
        "name": "Pisang Goreng",
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
    "name": "Unauthorized",
    "message": "invalid token"
}
```
Status 500
```
{
   msg: "Internal Server Error"
}
```
# POST /admin/products
### Create A Product
## Endpoint
> https://secure-eyrie-18193.herokuapp.com/admin/products


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
    price: Integer,
    stock: Integer,
    image_url: String
}
```
#### All Request Body is **REQUIRED**
## Success Response :
Status 201
```
{
    "Data": {
        "id": 1,
        "name": "Pisang Goreng",
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
      "message":[ 
                    "Input1 Cannot Be Empty",
                    "Input2 Cannot Be Empty"
                ]
   }
]
```
Status 401
```
{
    "message": "invalid token"
}
```
Status 500
```
{
   msg: "Internal Server Error"
}
```
# GET /admin/products/:id
### Get Products By ID
## Endpoint
> https://secure-eyrie-18193.herokuapp.com/admin/products/:id

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
    "name": "Pisang Goreng",
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
    "message": "invalid token"
}
Status 404
```
{
   msg: "Not Found"
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
> https://secure-eyrie-18193.herokuapp.com/admin/products/:id

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
        "name": "Pisang Goreng",
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
      "message":[ 
                    "Input1 Cannot Be Empty",
                    "Input2 Cannot Be Empty"
                ]
    }
]
```
Status 401
```
{
    "message": "invalid token"
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
> https://secure-eyrie-18193.herokuapp.com/admin/products/:id
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
    "message": "invalid token"
}
```
Status 403
```
{
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
> https://secure-eyrie-18193.herokuapp.com/user/register

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
      "message":[ 
                    "Input1 Cannot Be Empty",
                    "Input2 Cannot Be Empty"
                ]
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
> https://secure-eyrie-18193.herokuapp.com/user/login
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
     "name": "Bad Request"
     "message":[ 
                "Input1 Cannot Be Empty",
                "Input2 Cannot Be Empty"
               ]
}
```
Status 500
```
{
   msg: "Internal Server Error"
}