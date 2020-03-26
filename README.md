# e-commerce-cms

# Deploy Link :
CMS side :
## [fznakbar e-commerce-cms](https://fznakbar-e-commerce-cms.firebaseapp.com/login)
For login, use this account :

email : fauzan@admin.com

password : 1234

-------------------------

USER side :

## [fznakbar e-commerce](https://fznakbar-e-commerce.firebaseapp.com)

# Endpoint:
## [http://localhost:3000](http://localhost:3000)

# POST /register admin
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

# POST /register user
## Endpoint
> /users/registeruser

## Request body:
```
{
    email: string,
    name:string,
    password:string,
}
```
All req.body is **required**


## Response
Status 201
```
{
    "name": "YOUR_NAME",
    "access_token : "YOUR_ACCESS_TOKEN"
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

# POST /login admin
## Endpoint
> /users/loginadmin

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

# POST /login user
## Endpoint
> /users/loginuser

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

# GET /products/:id - Get One Product
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

# DELETE /products/:id - Delete Products
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

# PUT /products/:id - Edit Products
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

# GET /cart - Get all cart
## Endpoint
>/cart
## Authentication:
User Token (required)

## Request header: 
```
access_token: YOUR_TOKEN
```
## Response:
Status 200
```
{
    "id": 14,
    "name": "Fauzan User",
    "role": "user",
    "email": "fauzan@user.com",
    "password": "$2b$10$g6W.XptqOW5PDO8N.45LGOvbwB8p0B9N0jCLxLRKYp9wd1KfE6ZTi",
    "createdAt": "2020-03-24T03:07:35.497Z",
    "updatedAt": "2020-03-24T03:07:35.497Z",
    "Products": [
        {
            "id": 2,
            "name": "Crankshaft",
            "image_url": "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full/MTA-5112070/faito_faito-racing-struk-up-crankshaft-kruk-as-motor-for-kawasaki-ksr110--3-0-mm-_full02.jpg",
            "price": 1200000,
            "stock": 97,
            "createdAt": "2020-03-17T10:18:13.327Z",
            "updatedAt": "2020-03-25T17:43:29.474Z",
            "Cart": {
                "UserId": 14,
                "ProductId": 2,
                "amount": 1,
                "total": 1200000,
                "createdAt": "2020-03-25T19:01:24.089Z",
                "updatedAt": "2020-03-25T19:23:26.176Z"
            }
        },
        {
            .
            .
            .
        },
    ]
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

# POST /cart/addcart - For Add Product to Cart
## Endpoint
>/cart/addcart
## Authentication:
User Token (required)

## Request header: 
```
access_token: YOUR_TOKEN
```
## Request body:
```
{
    id: integer,
    amount : integer,
    total : integer
}
```

## Response:
Status 201
```
{
    "UserId": 14,
    "ProductId": 2,
    "amount": 1,
    "total": 1200000,
    "updatedAt": "2020-03-26T02:50:57.428Z",
    "createdAt": "2020-03-26T02:50:57.428Z",
    "id": 70
}
```
Status 400
```
{
    "message": "Already in your Cart"
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

# POST /finddelete/:id - For Buy Product
## Endpoint
>/finddelete/:id
## Authentication:
User Token (required)

## Request header: 
```
access_token: YOUR_TOKEN
```
## Request body:
```
{
    amount: integer
}
```

## Response:
Status 200
```
{
    "message": "Success delete cart and update stock"
}
```
Status 400
```
{
    "message": "Sorry this item is run out of stock"
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

# PUT /cart/editplus/:id - For Add 1 Quantity Product in Cart
## Endpoint
>/cart/editplus/:id
## Authentication:
User Token (required)

## Request header: 
```
access_token: YOUR_TOKEN
```
## Request body:
```
{
    id: integer,
    amount : integer,
    price : integer
}
```

## Response:
Status 200
```
{
    "message" : "Success add quantity"
}
```

Status 401
```
{
    "message": "Invalid Token"
}
```

Status 500
```
{
   status: 500,
   msg: "Internal Server Error"
}
```

# PUT /cart/editminus/:id - For Reduce 1 Quantity Product in Cart
## Endpoint
>/cart/editminus/:id
## Authentication:
User Token (required)

## Request header: 
```
access_token: YOUR_TOKEN
```
## Request body:
```
{
    id: integer,
    amount : integer,
    price : integer
}
```

## Response:
Status 200
```
{
    "message" : "Success reduce quantity"
}
```

Status 401
```
{
    "message": "Invalid Token"
}
```

Status 500
```
{
   status: 500,
   msg: "Internal Server Error"
}
```

# DELETE /cart/deletecard/:id - Delete Cart
## Endpoint
>/cart/deletecart/:id
## Authentication:
User Token (required)

## Request header: 
```
access_token: YOUR_TOKEN
```
## Response:
Status 200
```
{
    "message" : "Delete Success"
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