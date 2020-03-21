# e-commerce-cms

This is the documentation for using KANBAN API. The base url for this API is `https://whispering-cliffs-47024.herokuapp.com`


To use this app with user interface, kindly visit this link https://kanban-1584072346233.firebaseapp.com/

### 1. Register (If you Already have an account, you can skip this part, Only register new Costumer)

* **URL**
  
  /user/register

* **METHOD**
  
  `POST`

* **REQUEST BODY**
  
  Using JSON

  ```javascript
  {
	"name": "test 4",
	"email": "test4@gmail.com",
	"password": "test123"
  }
  ```

* **SUCCESS RESPONSE**
  
  * CODE: 201
  * Content:
  
    ```javascript
    {
        "name": "test 4",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwibmFtZSI6InRlc3QgNCIsImVtYWlsIjoidGVzdDRAZ21haWwuY29tIiwiaWF0IjoxNTg0Nzk2ODE3fQ.4XTVbbU2MxyUiMrCkCXrmHW1broX1vm-n-sqi3r0xoQ",
        "message": "Successfully registered and logged in",
        "id": 4,
        "role": "customer"
    }
    ```

    You can use this token to use other features

* **ERROR RESPONSE**
  
  * Validation Error
    
    * CODE: 400
    
    * Content:
        
      ```javascript
        {
            "status": 400,
            "error": [
                {
                    "type": "Validation error",
                    "path": "name",
                    "msg": "Please input your name"
                },
                {
                    "type": "Validation error",
                    "path": "email",
                    "msg": "Please input your email"
                },
                {
                    "type": "Validation error",
                    "path": "email",
                    "msg": "Validation isEmail on email failed"
                }
            ]
        }
      ```

### 2. Log In

* **URL**
  
  /user/login

* **METHOD**
  
  `POST`

* **REQUEST BODY**
  
  Using JSON

  ```javascript
  {
	"email": "test4@gmail.com",
	"password": "test123"
  }
  ```

* **SUCCESS RESPONSE**
  
  * CODE: 200 
  * Content:
  
    ```javascript
    {
        "name": "test 4",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwibmFtZSI6InRlc3QgNCIsImVtYWlsIjoidGVzdDRAZ21haWwuY29tIiwiaWF0IjoxNTg0Nzk3MDI5fQ.rrU-0J3iDChGax7ekrII9umwLVdFKJu0zfGmzqC5ZCM",
        "message": "Successfully logged in",
        "role": "customer"
    }
    ```

* **ERROR RESPONSE**
  
  * Email not Found
    
    * CODE: 404
    
    * Content:
        
      ```javascript
        {
            "status": 404,
            "msg": "wrong email"
        }
      ```

  * Wrong Password
    
    *   CODE: 400

    *   Content:

        ```javascript
        {
            "status": 400,
            "msg": "wrong password"
        }
        ```

### 3. Get Products

* **URL**
  
  /products

* **METHOD**
  
  `GET`
  
* **SUCCESS RESPONSE**
  
  * CODE: 200 
  * Content:
  
    ```javascript
    {
        "products": [
            {
                "id": 1,
                "name": "Nike Tiempo Legend VII Academy TF - White/Black",
                "image_url": "https://ecs7.tokopedia.net/img/cache/700/product-1/2018/12/6/495517/495517_26e3335a-b260-440f-81d0-ae8bba947ae7_768_768.jpg",
                "price": 500000,
                "stock": 5,
                "createdAt": "2020-03-21T11:00:52.590Z",
                "updatedAt": "2020-03-21T11:00:52.590Z"
            },
            {
                "id": 2,
                "name": "NIKE MERCURIAL VAPORX VII 12 PRO NEYMAR AMARILLO IC",
                "image_url": "https://ecs7.tokopedia.net/img/cache/700/product-1/2018/11/20/20305009/20305009_b74ac120-e407-4ba0-8463-906822114b2c_700_700.jpg",
                "price": 700000,
                "stock": 3,
                "createdAt": "2020-03-21T11:00:52.590Z",
                "updatedAt": "2020-03-21T11:00:52.590Z"
            },
        ]
    }
    ```

* **ERROR RESPONSE**
  
  * Server Error
    
    * CODE: 500
    
    * Content:
        
      ```javascript
        {
            "status": 500,
            "msg": "Server Error"
        }
      ```

### 4. Add Product (Only for admin)

* **URL**
  
  /products

* **METHOD**
  
  `POST`

* **HEADERS**
  
  KEY:

    * token (the token you get after log-in)
  
* **REQUEST BODY**
  
  Using JSON

  ```javascript
  {
        "name": "Nike blabla",
        "image_url": "blablablabla.jpg",
        "price": 500000,
        "stock": 8
  }
  ```

* **SUCCESS RESPONSE**
  
  * CODE: 201
  * Content:
  
    ```javascript
    {
        "message": "Successfully add the product",
        "product": {
            "id": 7,
            "name": "Nike blabla",
            "image_url": "blablablabla.jpg",
            "price": 50000,
            "stock": 8,
            "updatedAt": "2020-03-21T13:31:45.540Z",
            "createdAt": "2020-03-21T13:31:45.540Z"
        }
    }
    ```

* **ERROR RESPONSE**
  
  * Validation Error
    
    * CODE: 400
    
    * Content:
        
        ```javascript
        {
            "status": 400,
            "error": [
                {
                    "type": "Validation error",
                    "path": "name",
                    "msg": "Please input the name of products"
                }
            ]
        }
        ```

  * Not Authorized (if role is admin)

    * CODE: 403
  
    * Content:
  
        ```javascript
        {
            "status": 403,
            "msg": "Not Authorized"
        }
        ```

  * Server Error
    
    * CODE: 500
    
    * Content:
        
        ```javascript
        {
            "status": 500,
            "msg": "Server Error"
        }
        ```

### 5. Get Product by Id

* **URL**
  
  /products/_productId_

* **METHOD**
  
  `GET`

* **SUCCESS RESPONSE**
  
  * CODE: 200 
  * Content:
  
    ```javascript
    {
        "product": {
            "id": 1,
            "name": "Nike Tiempo Legend VII Academy TF - White/Black",
            "image_url": "https://ecs7.tokopedia.net/img/cache/700/product-1/2018/12/6/495517/495517_26e3335a-b260-440f-81d0-ae8bba947ae7_768_768.jpg",
            "price": 500000,
            "stock": 5,
            "createdAt": "2020-03-21T11:00:52.590Z",
            "updatedAt": "2020-03-21T11:00:52.590Z"
        }
    }
    ```

* **ERROR RESPONSE**
  
  * Not Found
    
    * CODE: 404
    
    * Content:
        
        ```javascript
        {
            "status": 404,
            "msg": "Product Not Found"
        }
        ```

  * Server Error
    
    * CODE: 500
    
    * Content:
        
        ```javascript
        {
            "status": 500,
            "msg": "Server Error"
        }
        ```

### 6. Edit Product (Only for Admin)

* **URL**
  
  /products/_productId_

* **METHOD**
  
  `PUT`

* **HEADERS**
  
  KEY:

    * token (the token you get after log-in)
  
* **REQUEST BODY**
  
  Using JSON

  ```javascript
  {
         "name": "Nike blabla",
        "image_url": "blablablabla.jpg",
        "price": 200000,
        "stock": 3
  }
  ```

* **SUCCESS RESPONSE**
  
  * CODE: 201
  * Content:
  
    ```javascript
    {
        "message": "Successfully edit the product",
        "product": {
            "name": "nike blablabla",
            "image_url": "blablablabla.jpg",
            "price": "200000",
            "stock": "3"
    }
}
    ```

* **ERROR RESPONSE**
  
  * Validation Error
    
    * CODE: 400
    
    * Content:
        
        ```javascript
        {
            "status": 400,
            "error": [
                {
                    "type": "Validation error",
                    "path": "name",
                    "msg": "Please input the name of products"
                }
            ]
        }
        ```

  * Not Found
    
    * CODE: 404
    
    * Content:
        
        ```javascript
        {
            "status": 404,
            "msg": "Product Not Found"
        }
        ```

  * Not Authorized (if role is admin)

    * CODE: 403
  
    * Content:
  
        ```javascript
        {
            "status": 403,
            "msg": "Not Authorized"
        }
        ```

  * Server Error
    
    * CODE: 500
    
    * Content:
        
        ```javascript
        {
            "status": 500,
            "msg": "Server Error"
        }
        ```

### 7. Delete Product (Only for admin)

* **URL**
  
  /products/_productId_

* **METHOD**v
  
  `DELETE`

* **HEADERS**
  
  KEY:

    * token (the token you get after log-in)

* **SUCCESS RESPONSE**
  
  * CODE: 200 
  * Content:
  
    ```javascript
    {
        "message": "Successfully delete product"
    }
    ```

* **ERROR RESPONSE**
  
  * Not Found
    
    * CODE: 404
    
    * Content:
        
        ```javascript
        {
            "status": 404,
            "msg": "Product Not Found"
        }
        ```

  * Server Error
    
    * CODE: 500
    
    * Content:
        
        ```javascript
        {
            "status": 500,
            "msg": "Server Error"
        }
        ```