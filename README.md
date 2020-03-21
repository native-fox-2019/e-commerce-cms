# e-commerce-cms

# Server Documentation    

### Dependencies

| Package Name | Version |
| ------------ | ------- |
| bcrypt     | ^2.4.3  |
| cors         | ^2.8.5  |
| dotenv       | ^8.2.0  |
| express      | 4.17.1  |
| googleapis   | ^39.2.0 |
| jsonwebtoken | ^8.5.1  |
| pg           | ^7.18.1 |
| sequelize    | ^5.21.3 |

### Devpendencies

| Package Name | Version |
| ------------ | ------- |
| dotenv     | ^8.2.0  |

### Example .env

SECRET=kepoaja
PORT=3000

### Default Port

    SERVER = http://localhost:3000
    CLIENT = http://localhost:8080

## Server

    Tools: NodeJS, Express, sequelize, postgresql

## Table Responses

| Code | Description                                     |
| ---- | ----------------------------------------------- |
| 200  | Response Sukses                                 |
| 201  | Data berhasil ditambahkan                       |
| 400  | Request yang diberikan tidak lengkap atau salah |
| 403  | Tidak memiliki otoritas                         |
| 404  | Data tidak ditemukan / tidak ada                |
| 500  | Error dari sisi server / tidak diduga-duga :v   |


### ADMIN

| Url        | Method | Description                            |
| ---------- | ------ | -------------------------------------- |
| /admins/register     | POST   | Menambahkan User baru                      |
| /admins     | GET   | Mencari atau Melihat daftar Semua User                      |
| /admins/login     | POST   | Mendapatkan token dan mengirim token ke client                      |


### 1. POST / admins / register

_Request header:_

```javascript
{
    "Content-Type": "application/json"
}
```

<br>

_Example Input (Request Body) :_

```javascript
{
    "username": "marcel",
    "email": "marcel123@gmail.com",
    "password": "123",	
}
```

_Response (201, Data berhasil ditambahkan):_

```javascript
{
    "username": "marcel",
    "email": "marcel123@gmail.com",
    "password": "1aojadoa2sdasd4adplalaxlasclsml",	
    "updatedAt": "2020-02-03T13:03:50.806Z",
    "createdAt": "2020-02-03T13:03:50.806Z"
}
```


_Example Input (Request Body) :_

```javascript
{
    "username": "marcel",
    "email": "marcel123@gmail.com",
    "password": "",	
}
```

_Response ERROR (400, Request tidak lengkap):_

```javascript
{
	status: 400,
	msg: "Bad Request"
}
```
### 2. POST / admins / login

<br>


_Request header:_

```javascript
{
    "Content-Type": "application/json"
}
```

<br>

_Example Input (Request Body) :_

```javascript
{
    "email": "marcel123@gmail.com",
    "password": "123",	
}
```

_Response (200, Respon Sukses ):_

```javascript
{
    "username": "marcel",
    "email": "marcel123@gmail.com",
    "password": "1aojadoa2sdasd4adplalaxlasclsml",	
    "updatedAt": "2020-02-03T13:03:50.806Z",
    "createdAt": "2020-02-03T13:03:50.806Z"
}
```


_Example Error Input (Request Body) :_

```javascript
{
    "username": "marcel",
    "email": "marcel123@gmail.com",
    "password": "",	
}
```

_Response ERROR(400, Data tidak lengkap):_

```javascript
{
	status: 400,
	msg: "Password cannot empty."
}

```


### 3. GET / admins 


_Response (200, Respon Sukses):_

```javascript
[
  {
    "id": 1,
    "username": "marcelus",
    "email": "marcel123456@gmail.com",
    "password": "$2b$10$I2JXLSnEFazR50WQ4EiMPuNsYlOgoQBwJMgqG33Q0IrFEZY8HlrFG",
    "createdAt": "2020-03-05T10:51:42.750Z",
    "updatedAt": "2020-03-05T10:51:42.750Z"
  },
  {
    "id": 2,
    "username": "marcellll",
    "email": "marcel1234555@gmail.com",
    "password": "$2b$10$WVYzEHBXfwd1X75iNUmA6OQMN80nrpXnp1VB7VZR/Gf8zGf3vGWlO",
    "createdAt": "2020-03-05T12:51:42.921Z",
    "updatedAt": "2020-03-05T12:51:42.921Z"
  }
]
```

_If the "data" was empty, the response will be :_

```javascript
"[]";
```

### 4. PUT / admins

_Request header:_

```javascript
{
    "Content-Type": "application/json",
}
```

<br>

_Example Input (Request Body) :_

```javascript
{
    "email": "marcel123@gmail.com",
    "password": "123",	
}
```

_Response (200, Respon Sukses):_

```javascript
{
    "username": "marcel",
    "email": "marcel123@gmail.com",
    "password": "1aojadoa2sdasd4adplalaxlasclsml",	
    "updatedAt": "2020-02-03T13:03:50.806Z",
    "createdAt": "2020-02-03T13:03:50.806Z"
}
```


_Example Error Input (Request Body) :_

```javascript
{
    "username": "marcel",
    "email": "marcel123@gmail.com",
    "password": "",	
}
```

_Response ERROR(400, Data tidak lengkap):_

```javascript
{
	status: 400,
	msg: "Password cannot empty."
}

```


## PRODUCTS


| Url        | Method | Description                            |
| ---------- | ------ | -------------------------------------- |
| /products     | POST   | Menambahkan products baru kedalam products list                      |
| /products     | GET   | Mencari atau Melihat products punya user                     |
| /products/:id     | GET   | Mencari atau Melihat products berdasarkan id                  |
| /products/:id| PUT  | Mengedit Data products         |
| /products/:id | DELETE   | Menghapus products dari table favorite                      |



### 1. POST /products

_Example Input (Request Body) :_

```javascript
{
"name,":"kopi sidingkalang"
"stock,":"10"
"urlImage,":"http://aisaosiaod.com"
"price,":"11000"
}
```

_Response (201, data berhasil ditambahkan):_

```javascript
{
  "id": 26,
  "name,":"kopi sidingkalang"
  "stock,":"10"
  "urlImage,":"http://aisaosiaod.com"
  "price,":"11000"  
  "updatedAt": "2020-03-16T09:33:50.071Z",
  "createdAt": "2020-03-16T09:33:50.071Z"
}
```

_Example ERROR Input (Request Body) :_

```javascript
{
  "name,":""
  "stock,":"10"
  "urlImage,":"http://aisaosiaod.com"
  "price,":"11000"
}
```


_Response (400, Bad Request):_

```javascript
[
  "Name Cannot Empty."
]
```

### 2.  GET / products

_Response (200, response sukses):_

```javascript
[
  {
    "id": 22,
    "name,":"kopi sidingkalang"
    "stock,":"10"
    "urlImage,":"http://aisaosiaod.com"
    "price,":"11000"
    "createdAt": "2020-03-16T09:20:29.722Z",
    "updatedAt": "2020-03-16T09:20:29.722Z",
  },
  {
    "id": 23,
    "name,":"kopi apaya"
    "stock,":"10"
    "urlImage,":"http://aisaosiaod.com"
    "price,":"11000"
    "createdAt": "2020-03-16T09:20:29.722Z",
    "updatedAt": "2020-03-16T09:20:29.722Z",
  },
  {
    "id": 24,
    "name,":"kopi coba-coba"
    "stock,":"10"
    "urlImage,":"http://aisaosiaod.com"
    "price,":"11000"
    "createdAt": "2020-03-16T09:20:29.722Z",
    "updatedAt": "2020-03-16T09:20:29.722Z",
  }
]
```


### 3.  PUT / products /:id


_Example Input (Request Body) :_

```javascript
{
    "id": 22,
    "name,":"kopi sidingkalang"
    "stock,":"10"
    "urlImage,":"http://aisaosiaod.com"
    "price,":"11000"
}
```
_Response (200, response sukses):_

```javascript
{
  "id": 22,
  "name,":"kopi sidingkalang"
  "stock,":"10"
  "urlImage,":"http://aisaosiaod.com"
  "price,":"11000"
  "createdAt": "2020-03-16T09:20:29.722Z",
  "updatedAt": "2020-03-16T09:20:29.722Z",
}

```

_If the ID wasn't found the respond will be (404, data not found):_

```javascript
{
  status: 404,
  msg: "data not found"
}
```

_Example Input (Request Body) :_

```javascript
{
  "id": 22,
  "name,":""
  "stock,":"10"
  "urlImage,":"http://aisaosiaod.com"
  "price,":"11000"
  "createdAt": "2020-03-16T09:20:29.722Z",
  "updatedAt": "2020-03-16T09:20:29.722Z",
}

```
_Response ERROR (400, data tidak lengkap):_

```javascript
{
  "status": 400,
  "msg": "Name cannot be empty."
}

```

### 4.  DELETE / products /:id



_Example Input (Request Params) :_

```javascript

 req.params.id = 2

```

	
_Response (200, response if success):_

```javascript
1
```


_Example Error Input (Request Body) :_

```javascript
req.params.id = 2
```


_Response ERROR (404, data not found):_

```javascript
{
  status: 404
  msg: 'Data not found'
}

```

### 5.  GET / products /:id



_Example Input (Request Params) :_

```javascript

 req.params.id = 2

```

	
_Response (200, response if success):_

```javascript
{
  {
    "id": 2,
    "name,":"kopi sidingkalang"
    "stock,":"10"
    "urlImage,":"http://aisaosiaod.com"
    "price,":"11000"
    "createdAt": "2020-03-16T09:20:29.722Z",
    "updatedAt": "2020-03-16T09:20:29.722Z",
  }

}
```


_Example Error Input (Request Body) :_

```javascript
req.params.id = 2
```


_Response ERROR (404, data not found):_

```javascript
{
  status: 404
  msg: 'Data not found'
}

```