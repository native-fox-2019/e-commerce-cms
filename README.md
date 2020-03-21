# Deploy Link :
## [https://e-commerce-cms-563db.firebaseapp.com](https://e-commerce-cms-563db.firebaseapp.com)

# Endpoint:
## [https://cryptic-oasis-44923.herokuapp.com](https://cryptic-oasis-44923.herokuapp.com)

# POST /users/register

## Register an account
## Endpoint
> /users/register

## Request body:
```
{
    email: string,
    password: string,
    role: string
}
```
All req.body is **required**
Role is between **Admin** and **User**

## Response
Status 201
```
{
    id: 1,
    email: "admin@admin.com",
    password: "hashedPassword",
    role: 'Admin',
    createdAt: 2020-03-03T15:01:27.405Z,
    updatedAt: 2020-03-03T15:01:27.405Z
}
```
Status 400
```
{
   status: 400,
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

# POST /users/login

## Login an account
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
   token: "YOUR_TOKEN"
}
```
Status 400
```
{
   status: 400,
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

# GET /product

## Get all product data
## Endpoint
> /product

## Authentication:
Token (required)

## Request header: 
```
token: YOUR_TOKEN
```
## Response:
Status 200
```
[
    {
        id: 1,
        name: "J!NX Hazard Zip-Up Hoodie",
        image_url: "https://cdn.shopify.com/s/files/1/0218/8417/4408/products/10637p_0c_1x_58b01f09-ec5c-4ea4-8571-1d978fa7664d_400x.jpg?v=1582822346",
        price: 750000,
        stock: 10,
        createdAt: 2020-04-03T15:01:27.405Z,
        updatedAt: 2020-04-03T15:01:27.405Z
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

# POST /product

## Add a new product
## Endpoint
> /product

## Authentication:
Token (required)

## Request header: 
```
token: YOUR_TOKEN
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
    id: 1,
    name: "J!NX Hazard Zip-Up Hoodie",
    image_url: "https://cdn.shopify.com/s/files/1/0218/8417/4408/products/10637p_0c_1x_58b01f09-ec5c-4ea4-8571-1d978fa7664d_400x.jpg?v=1582822346",
    price: 750000,
    stock: 10,
    createdAt: 2020-04-03T15:01:27.405Z,
    updatedAt: 2020-04-03T15:01:27.405Z
}
```
Status 400
```
{
   status: 400,
   msg: error message
}
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

# DELETE /product/:id

## Delete a product
## Endpoint
>/product/:id
## Authentication:
Token (required)

## Request header: 
```
token: YOUR_TOKEN
```
## Response:
Status 200
```
{
    msg: 'Your data has been deleted'
}
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
Status 404
```
{
   status: 404,
   msg: "Error Not Found"
}
```
Status 500
```
{
   status: 500,
   msg: "Internal Server Error"
}
```

# PUT /product/:id

## Edit a product
## Endpoint
> /product/:id

## Authentication:
Token (required)

## Request header: 
```
token: YOUR_TOKEN
```
## Request body:
```
{
    id: 1,
    name: "J!NX Hazard Zip-Up Hoodie",
    image_url: "https://cdn.shopify.com/s/files/1/0218/8417/4408/products/10637p_0c_1x_58b01f09-ec5c-4ea4-8571-1d978fa7664d_400x.jpg?v=1582822346",
    price: 750000,
    stock: 10
}
```
## Response:
Status 200
```
{
    id: 1,
    name: "J!NX Hazard Zip-Up Hoodie",
    image_url: "https://cdn.shopify.com/s/files/1/0218/8417/4408/products/10637p_0c_1x_58b01f09-ec5c-4ea4-8571-1d978fa7664d_400x.jpg?v=1582822346",
    price: 750000,
    stock: 10 
}
```
Status 400
```
{
   status: 400,
   msg: error message
}
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
Status 404
```
{
   status: 404,
   msg: "Error Not Found"
}
```
Status 500
```
{
   status: 500,
   msg: "Internal Server Error"
}
```