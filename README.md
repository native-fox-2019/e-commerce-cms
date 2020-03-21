# e-commerce-cms

### by Henarivan Andhika Abhirama

#### Postman Documentation
For a more precise request of a certain status, check link below
Link to postman documentations: https://documenter.getpostman.com/view/10571131/SzKbKuJS

## GET /products
Get all products that the user have

### Properties
- token (String)

#### Request Header
```javascript
{
   "access_token" : "<user_token>" 
}
```

### Response
Status 200

```javascript
[
    {
        "id": 2,
        "name": "iPhone sepuluh",
        "image_url": "www.google.com",
        "price": 10000000,
        "stock": 1,
        "createdAt": "2020-03-20T15:04:33.095Z",
        "updatedAt": "2020-03-21T10:25:39.618Z"
    }
]
```
<br>

## POST /products
Create a product

### Properties
- Name (String)
    - Can not be null or empty
- Image Url (String)
    - Can not be null or empty
- Price (Integer)
    - Can not be null or empty
    - Can not be negatives
- Stock (Integer)
    - Can not be null or empty
    - Can not be negatives


#### Request Header
```javascript
{
   "Content-Type": "application/json",
   "access_token" : "<user_token>" 
}
```

#### Request Body
```javascript
{
	"name": "iphone 11",
	"image_url": "www.google.com",
	"price": 30000000,
	"stock": 2
}
```

#### Response
Status 201
```javascript
{
    "newProduct": {
        "id": 5,
        "name": "iphone 11",
        "image_url": "www.google.com",
        "price": 30000000,
        "stock": 2,
        "updatedAt": "2020-03-21T16:17:59.382Z",
        "createdAt": "2020-03-21T16:17:59.382Z"
    },
    "message": "Added a new product!"
}
```

Status 400
```javascript
{
  "status": 400,
  "msg": [
    "Validation errors (Product Name can not be empty)"
  ]
}
```
<br>

## GET /todos/:id

<br>

## PUT /products/:id
Update a product details by the id from the products resources

### Properties
- Name (String)
    - Can not be null or empty
- Image Url (String)
    - Can not be null or empty
- Price (Integer)
    - Can not be null or empty
    - Can not be negatives
- Stock (Integer)
    - Can not be null or empty
    - Can not be negatives

#### Request Headers
```javascript
{
    "Content-Type": "application/json",
    "access_token" : "<user_token>"
}
```

#### Request Body
```javascript
{
	"name": "iphone 11",
	"image_url": "www.google.com",
	"price": 20000000,
	"stock": 2
}
```

#### Response
Status (200)
```javascript
{
    "edited": {
        "name": "iphone 11",
        "image_url": "www.google.com",
        "price": 20000000,
        "stock": 2
    },
    "message": "Product edited"
}
```

Status (400)
```javascript
{
  "status": 400,
  "msg": [
    "Validation errors (Product Name can not be empty)",
    "Validation errors (Product Image Url can not be empty)",
    "Validation errors (Product Price can not be negatives)",
    "Validation errors (Product Stock can not be negatives)"
  ]
}
```

Status (403)
```javascript
{
  "status": 403,
  "msg": "You are not authorized"
}
```

Status (404)
```javascript
{
  "status": 404,
  "msg": "Product not found"
}
```
<br>

## DELETE /products/:id
Delete a products

### Properties
- id (Number)
    - Gotten from the client

#### Request Headers
```javascript
{
    "Content-Type": "application/json",
    "access_token" : "<user_token>"
}
```

#### Response
Status (200)
```javascript
{
    "deleted": {
        "id": 5,
        "name": "iphone 11",
        "image_url": "www.google.com",
        "price": 20000000,
        "stock": 2,
        "createdAt": "2020-03-21T16:17:59.382Z",
        "updatedAt": "2020-03-21T16:19:15.215Z"
    },
    "message": "Product deleted"
}
```

Status (403)
```javascript
{
  "status": 403,
  "msg": "You are not authorized"
}
```

Status (404)
```javascript
{
  "status": 404,
  "msg": "Products not found"
}
```
<br>

## POST /register
Sign up an account

### Properties
- Name (String)
    - Can not be null or empty
- email (String)
    - Can not be null or empty
- password (String)
    - Can not be null or empty
- role (String)

#### Request Headers
```javascript
{
    "Content-Type": "application/json"
}
```

#### Request Body
```javascript
{
	"name": "ivan",
	"email": "ivan@gmail.com",
	"password": "12345",
	"role": "admin"
}
```

#### Response
Status (201)
```javascript
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiZW1haWwiOiJpdmFuQGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTU4NDgwNzI2N30.x2FuQQkRKqAThBV6CpgvoFbpitVoGaaT3tZg08BRvhA"
}
```
Status (400)
```javascript
{
  "status": 400,
  "msg": [
    "Validation errors (Name can not be empty)",
    "Validation errors (Email can not be empty)",
    "Validation errors (Password can not be empty)"
  ]
}
```
<br>

## POST /login
Login to an account
Generates a token for authentication

### Properties
- email (String)
- password (String)

#### Request Headers
```javascript
{
    "Content-Type": "application/json"
}
```
#### Request Body
```javascript
{
	"email" : "akbar@gmail.com",
	"password" : "qwerty"
}
```

#### Response
Status (200)
```javascript
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJiYW1iYW5nQGdtYWlsLmNvbSIsInJvbGUiOiJzdXBlckFkbWluIiwiaWF0IjoxNTg0ODA3MTEyfQ.rsURxf-VH6m4XkN5IDR3I6qUzYbSr7zJYHY-2gMtVSs"
}
```

Status (400)
```javascript
{
  "status": 400,
  "msg": "Wrong Email / Password"
}
```
<br>