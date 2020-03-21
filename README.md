# e-commerce-cms

# Deploy Link

    https://oldie-music-admin.firebaseapp.com/

# Server Documentation

### Dependencies

| Package Name  | Version   |
| ------------  | --------  |
| cors          | ^2.8.5    |
| dotenv        | ^8.2.0    |
| express       | 4.17.1    |
| jsonwebtoken  | ^8.5.1    |
| pg            | ^7.18.1   |
| sequelize     | ^5.21.3   |
| bcrypt    | ^4.0.1   |

### Example .env

    DB_USERNAME =
    DB_PASSWORD =
    SECRET =
    PORT =

## Default Port
    SERVER = https://still-tundra-68355.herokuapp.com/
    CLIENT = https://oldie-music-admin.firebaseapp.com/

## Server
    Tools: NodeJS, Express, sequelize, postgresql

### USER
| Url        | Method | Description                            |
| ---------- | ------ | -------------------------------------- |
| /users/register    | POST  | Menambahkan user baru            |
| /users/login       | POST  | Melakukan login dan mendaptkan token  |
| /users/adminRegister | POST  |  Menambahkan admin baru  |
| /users/adminLogin | POST  | Melakukan login untuk admin|

### 1. POST /users/register

_Example Input (Request Body):_
```javascript
{
    "email": "example@example.com",
    "password": "123",
    "username": "example"
}
```

_Response (201):_
```javascript
{
       access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsImVtYWlsIjoiZXhwYW1wbGVAZXhhbXBsZS5jb20iLCJpYXQiOjE1ODM1NjQyODF9.jvh2CegZlsax09Cp_wcSiOed_84BUJTHJuC1IDAiTXs"
} 
```

_Example Input (Request Body) :_

```javascript
{
    "email": ,
    "password": "123",
    "username": "example"	
}
```

_Response ERROR (400):_

```javascript
{
	message: "Email is empty"
}
```

_Example Input (Request Body) :_

```javascript
{
    "email": "example@example.com",
    "password": ,
    "username": "example"	
}
```

_Response ERROR (400):_

```javascript
{
	message: "Password is empty"
}
```

_Example Input (Request Body) :_

```javascript
{
    "email": "example@example.com",
    "password": "123",
    "username": 	
}
```

_Response ERROR (400):_

```javascript
{
	message: "Username is empty"
}
```

### 2. POST /users/login

_Example Input (Request Body):_
```javascript
{
    "email": "example@expample.com",
    "password": "123"
}
```

_Response (201):_
```javascript

   {
       access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsImVtYWlsIjoiZXhwYW1wbGVAZXhhbXBsZS5jb20iLCJpYXQiOjE1ODM1NjQyODF9.jvh2CegZlsax09Cp_wcSiOed_84BUJTHJuC1IDAiTXs"
   } 

```

_Example Input (Request Body) :_

```javascript
{
    "email": "example@expample.com",
    "password": ,	
}
```

_Response ERROR (400):_

```javascript
{
	message: "Wrong email/password"
}

```

### 3. POST /users/adminRegister
_Example Input (Request Body):_
```javascript
{
    "email": "example_admin@example.com",
    "password": "123",
    "username": "example"
}
```

_Response (201):_
```javascript
{
       message: "Admin created"
} 
```

### 4. POST /users/adminLogin
_Example Input (Request Body):_
```javascript
{
    "email": "example_admin@example.com",
    "password": "123"
}
```

_Response (201):_
```javascript
 {
       access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsImVtYWlsIjoiZXhwYW1wbGVAZXhhbXBsZS5jb20iLCJpYXQiOjE1ODM1NjQyODF9.jvh2CegZlsax09Cp_wcSiOed_84BUJTHJuC1IDAiTXs"
   } 
```

### Todo
| Url        | Method | Description                            |
| ---------- | ------ | -------------------------------------- |
| /products/    | POST  | Menambahkan produk baru            |
| /products/       | GET  | Menampilkan list produk  |
| /products/:id | GET  | Menampilkan produk berdasarkan id    |
| /products/:id | PUT  | Melakukan edit ke produk    |
| /products/:id | DELETE  | Menghapus produk dari list    |

### 1. POST /products

_Example Input (Request Headers):_
```javascript
{
    eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJmYXV6YW5AZW1haWwuY29tIiwiaWF0IjoxNTgzMjI0NDUzfQ.f9xFh_GctsZvEDEgdlmMYU13CPOlOdD4Btme8oi0tgA

}
```

_Example Input (Request Body):_
```javascript
{
	"name" : "Gibson ES-335",
    "image_url" : "www.test.com",
    "price": "75000000",
    "stock": "1"
}
```

_Response (201):_
```javascript
{
	"name" : "Gibson ES-335",
    "image_url" : "www.test.com",
    "price": "75000000",
    "stock": "1"
}
```

_Example Input:_
```javascript
{
	"name" : ,
    "image_url" : "www.test.com",
    "price": "75000000",
    "stock": "1"
}
```

_Response ERROR (400):_

```javascript
{
	message: "Name is empty"
}

```

_Example Input:_
```javascript
{
	"name" : "Gibson ES-335",
    "image_url" : ,
    "price": "75000000",
    "stock": "1"
}
```

_Response ERROR (400):_

```javascript
{
	message: "Image url is empty"
}

```

_Example Input:_
```javascript
{
	"name" : "Gibson ES-335",
    "image_url" : "www.test.com",
    "price": ,
    "stock": "1"
}
```

_Response ERROR (400):_

```javascript
{
	message: "Price is empty"
}

```

_Example Input:_
```javascript
{
	"name" : "Gibson ES-335",
    "image_url" : "www.test.com",
    "price": "75000000",
    "stock": 
}
```

_Response ERROR (400):_

```javascript
{
	message: "Stock is empty"
}

```

_Example Input (Request Headers):_
```javascript
{

}
```

_Example Input (Request Body):_
```javascript
{
	"name" : "Gibson ES-335",
    "image_url" : "www.test.com",
    "price": "75000000",
    "stock": "1"
}
```

_Response ERROR (401):_
```javascript
{
	message: "jwt must be provided"
}
```

_Example Input (Request Headers):_
```javascript
{
    eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJmYXV6YW5AZW1haWwuY29tIiwiaWF0IjoxNTgzMjI0NDUzfQ.f9xFh_GctsZvEDEgdlmMYU13CPOlOdD4Btme8

}
```

_Example Input (Request Body):_
```javascript
{
	"name" : "Gibson ES-335",
    "image_url" : "www.test.com",
    "price": "75000000",
    "stock": "1"
}
```

_Response ERROR (403):_
```javascript
{
	message: "not authorized"
}
```

### 2. GET /products

_Example Input (Request Headers):_
```javascript
{
    eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJmYXV6YW5AZW1haWwuY29tIiwiaWF0IjoxNTgzMjI0NDUzfQ.f9xFh_GctsZvEDEgdlmMYU13CPOlOdD4Btme8oi0tgA

}
```

_Response (200):_
```javascript
{
	"name" : "Gibson ES-335",
    "image_url" : "www.test.com",
    "price": "75000000",
    "stock": "1",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
}

```

_Example Input (Request Headers) :_

```javascript
{
    	
}
```

_Response ERROR (401):_

```javascript
{
	message: "jwt must be provided"
}

```

### 3. GET /products/:id

_Example Input (Request Headers):_
```javascript
{
    eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJmYXV6YW5AZW1haWwuY29tIiwiaWF0IjoxNTgzMjI0NDUzfQ.f9xFh_GctsZvEDEgdlmMYU13CPOlOdD4Btme8oi0tgA
}
```

_Response (201):_
```javascript
{
	"name" : "Gibson ES-335",
    "image_url" : "www.test.com",
    "price": "75000000",
    "stock": "1",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
}

```

_Example Input (Request Headers):_

```javascript
{

}
```

_Response ERROR (404):_

```javascript
{
	message: "jwt must be provided"
}

```

### 4. PUT /products/:id

_Example Input (Request Headers):_
```javascript
{
    eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJmYXV6YW5AZW1haWwuY29tIiwiaWF0IjoxNTgzMjI0NDUzfQ.f9xFh_GctsZvEDEgdlmMYU13CPOlOdD4Btme8oi0tgA
}
```

_Example Input (Request Body):_
```javascript
{
	"name" : "Gibson ES-335 1965",
    "image_url" : "www.test.com",
    "price": "75000000",
    "stock": "1"
}
```

_Response (200):_
```javascript
{
	"name" : "Gibson ES-335 1965",
    "image_url" : "www.test.com",
    "price": "75000000",
    "stock": "1"
}

```

_Example Input (Request Headers):_
```javascript
{
    eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJmYXV6YW5AZW1haWwuY29tIiwiaWF0IjoxNTgzMjI0NDUzfQ.f9xFh_GctsZvEDEgdlmMYU13CPOlOdD4Btme8

}
```

_Example Input (Request Body):_
```javascript
{
	"name" : "Gibson ES-335 1965",
    "image_url" : "www.test.com",
    "price": "75000000",
    "stock": "1"
}
```

_Response ERROR (403):_
```javascript
{
	message: "not authorized"
}
```

_Response ERROR (404):_

```javascript

	"error not found"

```

### 5. DELETE /products/:id

_Example Input (Request Headers):_
```javascript
{
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJmYXV6YW5AZW1haWwuY29tIiwiaWF0IjoxNTgzMjI0NDUzfQ.f9xFh_GctsZvEDEgdlmMYU13CPOlOdD4Btme8oi0tgA
}
```

_Response (200):_
```javascript
{
	"name" : "Gibson ES-335",
    "image_url" : "www.test.com",
    "price": "75000000",
    "stock": "1",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
}

```

_Example Input (Request Headers):_
```javascript
{

}
```

_Response ERROR (401):_
```javascript
{
	message: "jwt must be provided"
}

```

_Example Input (Request Headers):_
```javascript
{
    eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJmYXV6YW5AZW1haWwuY29tIiwiaWF0IjoxNTgzMjI0NDUzfQ.f9xFh_GctsZvEDEgdlmMYU13CPOlOdD4Btme8

}
```

_Example Input (Request Body):_
```javascript
{
	"name" : "Gibson ES-335 1965",
    "image_url" : "www.test.com",
    "price": "75000000",
    "stock": "1"
}
```

_Response ERROR (403):_
```javascript
{
	message: "not authorized"
}
```

_Response ERROR (404):_

```javascript
{
	"error not found"
}

```