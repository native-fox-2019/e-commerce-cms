<!-- @format -->

<h1 align ="center">

e-commerce-cms

</h1>

## Server router of e-commerce-CMS:

-deploy : https://e-commerce-cms-5a89f.firebaseapp.com
-admin email : gusti@gmail.com
        password : 12345

====================USER SIDE=========================

### 1. POST /user/register

- Request Header :

Content-Type : application/x-www-form-urlencoded

---

- Request Body :

       first_name : gusti
       last_name : putra
       email : gusti@gmail.com
       password : 12345

---

- Success response with status (200) :

        {
            "id": 2,
            "first_name": "gusti",
            "last_name": "putra",
            "email": "gusti@gmail.com",
            "password": "$2b$10$/Kg2OPAbLvFGa62jJ75kxO3jSOydqUxchZaLDQsRrJWpn6tu.w.kS",
            "updatedAt": "2020-03-16T17:41:33.401Z",
            "createdAt": "2020-03-16T17:41:33.401Z",
            "isAdmin": null
        }

---

- Data Not Found Resposnse (404) :

        {
            "message": "password can not be empty!"
        }

---

- Internal Server Error response with status (500) :

  Typo in server sample :

        {
             "message": "Internal server error!"
        }

---

### 2. POST /user/login

- Request Header :

Content-Type : application/x-www-form-urlencoded

---

- Request Body :

        email : "gusti@gmail.com

        password : "12345"

---

- Success response with status (200) :

        {
                "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJndXN0aUBnbWFpbC5jb20iLCJpYXQiOjE1ODQzODQzNDR9.ZHOnpj4cjUyjMPezC-JIU4UMlOfj7GiyOpQ27uqX3Do"
        }

---

- Data Not Found Resposnse (404) :

        {
                "message": [
                        "email or password wrong!"
                ]
        }

---

- Internal Server Error response with status (500) :

  Typo in server sample :

        {
             "message": "Internal server error!"
        }

---

======================== PRODUCT SIDE ============================

<br></br>

### 1. POST /products

- Request Header :
  token : token

        Content-Type :  application/x-www-form-urlencoded
        token : token

---

- Request Body :

        name: bakso,
        category: makanan,
        description: bakso enak,
        image_url: jsbcjasbcjbs,
        stock: 4,
        price: 20000,

---

- Success response with status (201) :

        {
                "id": 1,
                "name": "bakso",
                "category": "makanan",
                "description": "bakso enak",
                "image_url": "jsbcjasbcjbs",
                "stock": 4,
                "price": 20000,
                "UserId": 1,
                "updatedAt": "2020-03-16T20:23:23.405Z",
                "createdAt": "2020-03-16T20:23:23.405Z"
        }

---

- Validation Error response with status (400) :

  if one of Request Body form is empty (title for sample) :

        {
            "message": [
                "title can not be empty!"
            ]
        }

  ***

- Internal Server Error response with status (500) :

  Typo in server sample :

        {
             "message": "Internal server error!"
        }

---

<br></br>

### 2. GET /products

- Request Header :
  token : token

- Success response with status (200) :

       [
                {
                        "id": 1,
                        "name": "bakso",
                        "description": "bakso enak",
                         "image_url": "jsbcjasbcjbs",
                        "price": 20000,
                        "stock": 4,
                        "category": "baju",
                        "UserId": 1,
                        "createdAt": "2020-03-16T20:23:23.405Z",
                        "updatedAt": "2020-03-16T20:23:23.405Z"
                }
        ]
---

- Internal Server Error response with status (500) :

  Typo in server sample :

        {
             "message": "Internal server error!"
        }

---

<br></br>

### 3.  PUT / product /:id


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

### 4.  DELETE / product /:id



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

### 5.  GET / transaction /:id



_Example Input (Request Params) :_

```javascript

 req.params.id = 2

```

	
_Response (200, response if success):_

```javascript
{
  {
    "id": v2,
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


