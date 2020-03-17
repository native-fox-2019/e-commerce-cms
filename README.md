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

#### Response
Status 201
```javascript

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

```

#### Response
Status (200)
```javascript

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

#### Request Headers
```javascript
{
    "Content-Type": "application/json"
}
```

#### Request Body
```javascript
{
	"first_name" : "Puji",
	"last_name" : "Yanto",
	"email" : "puji@gmail.com",
	"password" : "qeqeqe"
}
```

#### Response
Status (201)
```javascript
{
  "id": 16,
  "first_name": "Puji",
  "last_name": "Yanto",
  "email": "puji@gmail.com",
  "password": "qeqeqe",
  "updatedAt": "2020-03-07T05:14:26.233Z",
  "createdAt": "2020-03-07T05:14:26.233Z"
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
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiZW1haWwiOiJha2JhckBnbWFpbC5jb20iLCJpYXQiOjE1ODM1NTM1OTN9.pV44TwKKmaEKIwXgs5-JTLosad7HSji8gIvtWN4Acvs"
```

Status (400)
```javascript
{
  "status": 400,
  "msg": "Wrong Email / Password"
}
```
<br>