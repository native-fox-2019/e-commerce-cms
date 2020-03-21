# e-commerce-cms
## User Register
----
  Returns json data.

* **URL**

  /register

* **Method:**

  `POST`
  
*  **URL Params**

   **Required:**
 
  None

* **Data Params**

    `name=[string]`

   `email=[string]`

   `password=[string]`

* **Success Response:**
  ### Input

      name = 'Arif Rachman Husen''
      
      email = 'arif05rachman@gmail.com'

      password = '12345'

  ### Response

  * **Code:** 201 OK<br />
    **Content:** 

        `{"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhcmlmIiwiaWF0IjoxNTgxNjY0NTgzfQ.mRMIr1EyfdKXrj86mPrQogjY5XQiL6VvWR-xi8UEYdw"}`
 
* **Error Response:**

  ### Input

      name = ''
      
      email = arif05rachman.com

      password = ''

  ### Response

  * **Code:** 400 BadRequest <br />
    **Content:** `{
  "message": [
    "User.password cannot be null",
    "Validation isEmail on email failed",
    "Validation notEmpty on name failed",
  ]
}`

  OR
  ### Input

      name = 'Arif Rachman Husen''

      
      email = 'arif05rachman@gmail.com'

      password = '12345'

  ### Response

  * **Code:** 409 Conflict <br />
    **Content:** `{ "message": "Email already register"
}`

* **Sample Call:**

  ```javascript
  axios
  .post(`${process.env.BASE_URL}/register`,{
      name:name ,username:username ,email:email ,password:password
  })
  ```

## User Login
----
  Returns json data.

* **URL**

  /login

* **Method:**

  `POST`
  
*  **URL Params**

   **Required:**
 
  None

* **Data Params**

   `email=[string]`

   `password=[string]`

* **Success Response:**
  ### Input
     
      email = 'arif05rachman@gmail.com'

      password = '12345'

  ### Response

  * **Code:** 200 OK<br />
    **Content:** 

        `{"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhcmlmIiwiaWF0IjoxNTgxNjY0NTgzfQ.mRMIr1EyfdKXrj86mPrQogjY5XQiL6VvWR-xi8UEYdw"}`
 
* **Error Response:**

  ### Input
     
      email = ''

      password = ''

  ### Response

  * **Code:** 400  BadRequest<br />
    **Content:** `{
  "message": [
    "User.password cannot be null",
    "Validation isEmail on email failed",
  ]
}`

  OR
  ### Input
     
      email = 'admin@gmail.com'

      password = 'qwerty'

  ### Response
  * **Code:** 401 Unauthorize <br />
    **Content:** `{
  "message": "Email or Password wrong"
}`

  OR
  ### Input
     
      email = 'arif05@gmail.com'

      password = '12345'

  ### Response

  * **Code:** 404 Not Found <br />
    **Content:** `{
  "message": "User Not Found"
}`

* **Sample Call:**

  ```javascript
  axios
  .post(`${process.env.BASE_URL}/login`,{
      email:email ,password:password
  })
  ```

## Admin Login
----
  Returns json data.

* **URL**

  /loginAdmin

* **Method:**

  `POST`
  
*  **URL Params**

   **Required:**
 
  None

* **Data Params**

   `email=[string]`

   `password=[string]`

* **Success Response:**
  ### Input
     
      email = 'admin@gmail.com'

      password = '12345'

  ### Response

  * **Code:** 200 OK<br />
    **Content:** 

        `{"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhcmlmIiwiaWF0IjoxNTgxNjY0NTgzfQ.mRMIr1EyfdKXrj86mPrQogjY5XQiL6VvWR-xi8UEYdw"}`
 
* **Error Response:**

  ### Input
     
      email = ''

      password = ''

  ### Response

  * **Code:** 400  BadRequest<br />
    **Content:** `{
  "message": [
    "User.password cannot be null",
    "Validation isEmail on email failed",
  ]
}`

  OR
  ### Input
     
      email = 'arif05rachman@gmail.com'

      password = 'qwerty'

  ### Response
  * **Code:** 401 Unauthorize <br />
    **Content:** `{
  "message": "Email or Password wrong"
}`

  OR
  ### Input
     
      email = 'arif05@gmail.com'

      password = '12345'

  ### Response

  * **Code:** 404 Not Found <br />
    **Content:** `{
  "message": "User Not Found"
}`

* **Sample Call:**

  ```javascript
  axios
  .post(`${process.env.BASE_URL}/login`,{
      email:email ,password:password
  })
  ```

## Admin Add
----
  Returns json data.

* **URL**

  /user

* **Method:**

  `POST`
  
*  **URL Params**

   **Required:**
 
*   **Header:**
    
        token : `<secretToken>`

* **Data Params**

    `name=[string]`

    `email=[string]`

    `password=[string]`

* **Success Response:**
  ### Input

      name = 'Arif Rachman Husen''
      
      email = 'arif05rachman@gmail.com'

      password = '12345'

      admin = true

  ### Response

  * **Code:** 201 OK<br />
    **Content:** 

        `{"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhcmlmIiwiaWF0IjoxNTgxNjY0NTgzfQ.mRMIr1EyfdKXrj86mPrQogjY5XQiL6VvWR-xi8UEYdw"}`
 
* **Error Response:**

  ### Input

      name = ''
      
      email = arif05rachman.com

      password = ''

  ### Response

  * **Code:** 400 BadRequest <br />
    **Content:** `{
  "message": [
    "User.password cannot be null",
    "Validation isEmail on email failed",
    "Validation notEmpty on name failed",
    "Validation notEmpty on username failed"
  ]
}`

  OR
  ### Input

      name = 'Arif Rachman Husen''

      
      email = 'arif05rachman@gmail.com'

      password = '12345'

  ### Response

  * **Code:** 409 Conflict <br />
    **Content:** `{ "message": "Email already register"
}`

* **Sample Call:**

  ```javascript
  axios
  .post(`${process.env.BASE_URL}/user`,{
      name:name ,email:email ,password:password
  })
  ```

## Read All User
----
  Returns json data.

* **URL**

  /user

* **Method:**

  `GET`
  
*  **URL Params**
    
        none

* **Data Body**
        none

* **Success Response:**
    ### input header

        token : `<secretToken>`
    
    ### input body

        
  * **Code:** 200 OK<br />
    **Content:** `[
        {
    "id": 3,
    "name": "Bob",
    "email": "admin@email.com",
    "password": <hasedpassword>,
    "admin": true,
    "updatedAt": "2020-02-14T15:37:46.848Z",
    "createdAt": "2020-02-14T15:37:46.848Z"
},{
    "id": 4,
    "name": "Jack",
    "email": "admin2@email.com",
    "password": <hasedpassword>,
    "AdministratorId": 1,
    "updatedAt": "2020-02-14T15:37:46.848Z",
    "createdAt": "2020-02-14T15:37:46.848Z"
}
]`
* **Error Response:**

    ### input header

        token : ``
    
    ### input body
        none

  * **Code:** 400 BadRequest <br />
    **Content:** `{
  "message": "token require"
}`


* **Sample Call:**

  ```javascript
  axios
  .get(`${process.env.BASE_URL}/user`)

## Read One User
----
  Returns json data.

* **URL**

  /user/id

* **Method:**

  `GET`
  
*  **URL Params**
    
        `id:3

*   **Header:**
    
        token : `<secretToken>`

* **Data Body**
        
        none

* **Success Response:**

    ### input header

        token : `<secretToken>`
    
    ### input body

        
  * **Code:** 200 OK<br />
    **Content:** `{
    "id": 3,
    "name": "Carrier",
    "email": admin3@email.com,
    "password": 30,
    "admin": true,
    "updatedAt": "2020-02-14T15:37:46.848Z",
    "createdAt": "2020-02-14T15:37:46.848Z"
}
`
 
* **Error Response:**

    ### input header

        token : ``
        
    
    ### input body
        none

  * **Code:** 404 BadRequest <br />
    **Content:** `{
  "message": "token require"
}`

OR

* **Error Response:**

    ### input header

        token : `<secretToken>`

    
    ### input body
        none

  * **Code:** 404 NotFound <br />
    **Content:** `{
  "message": "Data Not Found"
}`

* **Sample Call:**

  ```javascript
  axios
  .get(`${process.env.BASE_URL}/user/id`)

## Update User
----
  Returns json data.

* **URL**

  /user/id

* **Method:**

  `PUT`
  
*  **URL Params**
    
        `id:[integer]`

*   **Header:**
    
        token : `<secretToken>`

* **Data Body**

        `name=[string]`

        `email=[string]`

        `password=[string]`

* **Success Response:**

    ### params
    
        id : `3`

    ### input header

        token : `<secretToken>`
    
    ### input body
        id : 3

        name: Carrier,

        email: admin@email.com,

        password: password
        
  * **Code:** 200 OK<br />
    **Content:** `{
    "id": 3,
    "name": "Carrier",
    "email": email@email.com,
    "password": <hasedpassword>,
    "admin": true,
    "updatedAt": "2020-02-14T15:37:46.848Z",
    "createdAt": "2020-02-14T15:37:46.848Z"
}`
 
* **Error Response:**

    ### params
    
        id : `3`

    ### input header

        token : `<secretToken>`
    
    ### input body
        name: ,

        email: email@email.com,

        password: password
  * **Code:** 400 BadRequest <br />
    **Content:** `{
  "message": [
    "Validation notEmpty on name failed",
  ]
}`

OR

* **Error Response:**
    ### params
    
        id : `3`

    ### input header

        token : ``
    
    ### input body
        name: name,

        email: email@email.com,

        password: password

  * **Code:** 400 BadRequest <br />
    **Content:** `{
  "message": "token require"
}`


OR

* **Error Response:**
    ### params
    
        id : `90`

    ### input header

        token : `<secretToken>`

    
    ### input body
        name: name,

        email: unknown@email.com,

        password: password

  * **Code:** 404 NotFound <br />
    **Content:** `{
  "message": "Data Not Found"
}`

* **Sample Call:**

  ```javascript
  axios
  .put(`${process.env.BASE_URL}/user/id`,{
      name:name ,email: email@email.com ,password:"12345"
  })


## Delete User
----
  Returns json data.

* **URL**

  /user/id

* **Method:**

  `DELETE`
  
*  **URL Params**
    
        `id:[integer]`

*   **Header:**
    
        token : `<secretToken>`

* **Data Body**

* **Success Response:**

    ### params
    
        id : `3`

    ### input header

        token : `<secretToken>`
    
    ### input body
        none
        
  * **Code:** 200 OK<br />
    **Content:** `data succes delete`
 
* **Error Response:**

    ### params
    
        id : `3`

    ### input header

        token : ``
    
    ### input body
        none
  * **Code:** 400 BadRequest <br />
    **Content:** `{
  "message": "token require"
} `

OR

* **Error Response:**
    ### params
    
        id : `90`

    ### input header

        token : `<secretToken>`

    
    ### input body
        none

  * **Code:** 404 NotFound <br />
    **Content:** `{
  "message": "Data Not Found"
}`

* **Sample Call:**

  ```javascript
  axios
  .delete(`${process.env.BASE_URL}/user/id`,{
      name:name ,email:email@email.com ,password:<hassedpassword> 
  })

## Create Product
----
  Returns json data.

* **URL**

  /products

* **Method:**

  `POST`
  
*  **URL Params**
    
        none

*   **Header:**
    
        token : `<secretToken>`

* **Data Body**

        `name=[string]`

        `image_url=[string]`

        `price=[integer]`

        `stock=[integer]`

* **Success Response:**
    ### input header

        token : `<secretToken>`
    
    ### input body
        name: Carrier,

        image_url: http://localhost:3000/assets/image/product.jpg,

        price: 200000,

        stock: 30
        
  * **Code:** 200 OK<br />
    **Content:** `{
    "id": 3,
    "name": "Carrier",
    "image_url": "http://localhost:3000/assets/image/product.jpg",
    "price": 200000,
    "stock": 30,
    "AdministratorId": 1,
    "updatedAt": "2020-02-14T15:37:46.848Z",
    "createdAt": "2020-02-14T15:37:46.848Z"
}`
 
* **Error Response:**
    ### input header

        token : `<secretToken>`
    
    ### input body
        name: ,

        image_url: http://localhost:3000/assets/image/product.txt,

        price: -200000,

        stock: '30'
  * **Code:** 400 BadRequest <br />
    **Content:** `{
  "message": [
    "Validation notEmpty on name failed",
    "Validation imageExtention on image_url failed",
    "Validation notNegativeValue on price failed",
    "Validation isNumber on stock failed"
  ]
}`

OR

* **Error Response:**
    ### input header

        token : ``
    
    ### input body
        name: Carrier,

        image_url: http://localhost:3000/assets/image/product.jpg,

        price: 200000,

        stock: 30

  * **Code:** 400 BadRequest <br />
    **Content:** `{
  "message": "token require"
}`


* **Sample Call:**

  ```javascript
  axios
  .post(`${process.env.BASE_URL}/products`,{
      name:name ,image_url:image_url ,price:200000 ,stock:30
  })

## Read All Product
----
  Returns json data.

* **URL**

  /products

* **Method:**

  `GET`
  
*  **URL Params**
    
        none

   **Header:**
    
        token : `<secretToken>`

* **Data Body**
        none

* **Success Response:**
    ### input header

        token : `<secretToken>`
    
    ### input body

        
  * **Code:** 200 OK<br />
    **Content:** `[
        {
    "id": 3,
    "name": "Carrier",
    "image_url": "http://localhost:3000/assets/image/product.jpg",
    "price": 200000,
    "stock": 30,
    "AdministratorId": 1,
    "updatedAt": "2020-02-14T15:37:46.848Z",
    "createdAt": "2020-02-14T15:37:46.848Z"
},{
    "id": 4,
    "name": "Boots",
    "image_url": "http://localhost:3000/assets/image/product2.jpg",
    "price": 100000,
    "stock": 20,
    "AdministratorId": 1,
    "updatedAt": "2020-02-14T15:37:46.848Z",
    "createdAt": "2020-02-14T15:37:46.848Z"
}
]`
* **Error Response:**

    ### input header

        token : ``
    
    ### input body
        none

  * **Code:** 400 BadRequest <br />
    **Content:** `{
  "message": "token require"
}`


* **Sample Call:**

  ```javascript
  axios
  .get(`${process.env.BASE_URL}/products`)


## Read One Product
----
  Returns json data.

* **URL**

  /products/id

* **Method:**

  `GET`
  
*  **URL Params**
    
        `id:3

*   **Header:**
    
        token : `<secretToken>`

* **Data Body**
        
        none

* **Success Response:**

    ### input header

        token : `<secretToken>`
    
    ### input body

        
  * **Code:** 200 OK<br />
    **Content:** `{
    "id": 3,
    "name": "Carrier",
    "image_url": "http://localhost:3000/assets/image/product.jpg",
    "price": 200000,
    "stock": 30,
    "AdministratorId": 1,
    "updatedAt": "2020-02-14T15:37:46.848Z",
    "createdAt": "2020-02-14T15:37:46.848Z"
}
`
 
* **Error Response:**

    ### input header

        token : ``
        
    
    ### input body
        none

  * **Code:** 404 BadRequest <br />
    **Content:** `{
  "message": "token require"
}`

OR

* **Error Response:**

    ### input header

        token : `<secretToken>`

    
    ### input body
        none

  * **Code:** 404 NotFound <br />
    **Content:** `{
  "message": "Data Not Found"
}`

* **Sample Call:**

  ```javascript
  axios
  .get(`${process.env.BASE_URL}/products/id`)


## Update Product
----
  Returns json data.

* **URL**

  /products/id

* **Method:**

  `PUT`
  
*  **URL Params**
    
        `id:[integer]`

*   **Header:**
    
        token : `<secretToken>`

* **Data Body**

        `name=[string]`

        `image_url=[string]`

        `price=[integer]`

        `stock=[integer]`

* **Success Response:**

    ### params
    
        id : `3`

    ### input header

        token : `<secretToken>`
    
    ### input body
        id : 3

        name: Carrier,

        image_url: http://localhost:3000/assets/image/product.jpg,

        price: 200000,

        stock: 30
        
  * **Code:** 200 OK<br />
    **Content:** `{
    "id": 3,
    "name": "Carrier",
    "image_url": "http://localhost:3000/assets/image/product.jpg",
    "price": 200000,
    "stock": 30,
    "AdministratorId": 1,
    "updatedAt": "2020-02-14T15:37:46.848Z",
    "createdAt": "2020-02-14T15:37:46.848Z"
}`
 
* **Error Response:**

    ### params
    
        id : `3`

    ### input header

        token : `<secretToken>`
    
    ### input body
        name: ,

        image_url: http://localhost:3000/assets/image/product.txt,

        price: -200000,

        stock: '30'
  * **Code:** 400 BadRequest <br />
    **Content:** `{
  "message": [
    "Validation notEmpty on name failed",
    "Validation imageExtention on image_url failed",
    "Validation notNegativeValue on price failed",
    "Validation isNumber on stock failed"
  ]
}`

OR

* **Error Response:**
    ### params
    
        id : `3`

    ### input header

        token : ``
    
    ### input body
        name: Carrier,

        image_url: http://localhost:3000/assets/image/product.jpg,

        price: 200000,

        stock: 30

  * **Code:** 400 BadRequest <br />
    **Content:** `{
  "message": "token require"
}`


OR

* **Error Response:**
    ### params
    
        id : `90`

    ### input header

        token : `<secretToken>`

    
    ### input body
        name: Carrier,

        image_url: http://localhost:3000/assets/image/product.jpg,

        price: 200000,

        stock: 30

  * **Code:** 404 NotFound <br />
    **Content:** `{
  "message": "Data Not Found"
}`

* **Sample Call:**

  ```javascript
  axios
  .put(`${process.env.BASE_URL}/products/id`,{
      name:name ,image_url:image_url ,price:200000 ,stock:30
  })


## Delete Product
----
  Returns json data.

* **URL**

  /products/id

* **Method:**

  `DELETE`
  
*  **URL Params**
    
        `id:[integer]`

*   **Header:**
    
        token : `<secretToken>`

* **Data Body**

        `name=[string]`

        `image_url=[string]`

        `price=[integer]`

        `stock=[integer]`

* **Success Response:**

    ### params
    
        id : `3`

    ### input header

        token : `<secretToken>`
    
    ### input body
        none
        
  * **Code:** 200 OK<br />
    **Content:** `[ 1 , {
    "id": 3,
    "name": "Carrier",
    "image_url": "http://localhost:3000/assets/image/product.jpg",
    "price": 200000,
    "stock": 30,
    "AdministratorId": 1,
    "updatedAt": "2020-02-14T15:37:46.848Z",
    "createdAt": "2020-02-14T15:37:46.848Z"
}]`
 
* **Error Response:**

    ### params
    
        id : `3`

    ### input header

        token : ``
    
    ### input body
        none
  * **Code:** 400 BadRequest <br />
    **Content:** `{
  "message": "token require"
} `

OR

* **Error Response:**
    ### params
    
        id : `90`

    ### input header

        token : `<secretToken>`

    
    ### input body
        none

  * **Code:** 404 NotFound <br />
    **Content:** `{
  "message": "Data Not Found"
}`

* **Sample Call:**

  ```javascript
  axios
  .delete(`${process.env.BASE_URL}/products/id`,{
      name:name ,image_url:image_url ,price:200000 ,stock:30
  })

## Category Add
----
  Returns json data.

* **URL**

  /categories

* **Method:**

  `POST`
  
*  **URL Params**

   **Required:**
 
*   **Header:**
    
        token : `<secretToken>`

* **Data Params**

    `name=[string]`

* **Success Response:**
  ### Input

      name = 'adnventure''
      
  ### Response

  * **Code:** 201 OK<br />
    **Content:** 

        `{
        "id": 3,
        "name": "Action",
        "updatedAt": "2020-02-14T15:37:46.848Z",
        "createdAt": "2020-02-14T15:37:46.848Z"
        }`
 
* **Error Response:**

  ### Input

      name = ''
      
  ### Response

  * **Code:** 400 BadRequest <br />
    **Content:** `{
  "message": [
    "Validation notEmpty on name failed",
  ]
}`

* **Sample Call:**

  ```javascript
  axios
  .post(`${process.env.BASE_URL}/categories`,{
      name:name
  })
  ```

## Read All categories
----
  Returns json data.

* **URL**

  /categories

* **Method:**

  `GET`
  
*  **URL Params**
    
        none

* **Data Body**
        none

* **Success Response:**
    ### input header

        token : `<secretToken>`
    
    ### input body

        
  * **Code:** 200 OK<br />
    **Content:** `[
        {
    "id": 3,
    "name": "Action",
    "updatedAt": "2020-02-14T15:37:46.848Z",
    "createdAt": "2020-02-14T15:37:46.848Z"
},{
    "id": 4,
    "name": "Adventure",
    "updatedAt": "2020-02-14T15:37:46.848Z",
    "createdAt": "2020-02-14T15:37:46.848Z"
}
]`
* **Error Response:**

    ### input header

        token : ``
    
    ### input body
        none

  * **Code:** 400 BadRequest <br />
    **Content:** `{
  "message": "token require"
}`


* **Sample Call:**

  ```javascript
  axios
  .get(`${process.env.BASE_URL}/categories`)

## Read One categories
----
  Returns json data.

* **URL**

  /categories/id

* **Method:**

  `GET`
  
*  **URL Params**
    
        `id:3

*   **Header:**
    
        token : `<secretToken>`

* **Data Body**
        
        none

* **Success Response:**

    ### input header

        token : `<secretToken>`
    
    ### input body

        
  * **Code:** 200 OK<br />
    **Content:** `{
    "id": 3,
    "name": "Carrier",
    "updatedAt": "2020-02-14T15:37:46.848Z",
    "createdAt": "2020-02-14T15:37:46.848Z"
}
`
 
* **Error Response:**

    ### input header

        token : ``
        
    
    ### input body
        none

  * **Code:** 404 BadRequest <br />
    **Content:** `{
  "message": "token require"
}`

OR

* **Error Response:**

    ### input header

        token : `<secretToken>`

    
    ### input body
        none

  * **Code:** 404 NotFound <br />
    **Content:** `{
  "message": "Data Not Found"
}`

* **Sample Call:**

  ```javascript
  axios
  .get(`${process.env.BASE_URL}/categories/id`)

## Update categories
----
  Returns json data.

* **URL**

  /categories/id

* **Method:**

  `PUT`
  
*  **URL Params**
    
        `id:[integer]`

*   **Header:**
    
        token : `<secretToken>`

* **Data Body**

        `name=[string]`

    

* **Success Response:**

    ### params
    
        id : `3`

    ### input header

        token : `<secretToken>`
    
    ### input body
        id : 3

        name: Adventure,

  * **Code:** 200 OK<br />
    **Content:** `{
    "id": 3,
    "name": "Adventure",
    "updatedAt": "2020-02-14T15:37:46.848Z",
    "createdAt": "2020-02-14T15:37:46.848Z"
}`
 
* **Error Response:**

    ### params
    
        id : `3`

    ### input header

        token : `<secretToken>`
    
    ### input body
        name: ,

  * **Code:** 400 BadRequest <br />
    **Content:** `{
  "message": [
    "Validation notEmpty on name failed",
  ]
}`

OR

* **Error Response:**
    ### params
    
        id : `3`

    ### input header

        token : ``
    
    ### input body
        name: name,

  * **Code:** 400 BadRequest <br />
    **Content:** `{
  "message": "token require"
}`


OR

* **Error Response:**
    ### params
    
        id : `90`

    ### input header

        token : `<secretToken>`

    
    ### input body
        name: name,

  * **Code:** 404 NotFound <br />
    **Content:** `{
  "message": "Data Not Found"
}`

* **Sample Call:**

  ```javascript
  axios
  .put(`${process.env.BASE_URL}/categories/id`,{
      name:name
  })


## Delete categories
----
  Returns json data.

* **URL**

  /categories/id

* **Method:**

  `DELETE`
  
*  **URL Params**
    
        `id:[integer]`

*   **Header:**
    
        token : `<secretToken>`

* **Data Body**

* **Success Response:**

    ### params
    
        id : `3`

    ### input header

        token : `<secretToken>`
    
    ### input body
        none
        
  * **Code:** 200 OK<br />
    **Content:** `data succes delete`
 
* **Error Response:**

    ### params
    
        id : `3`

    ### input header

        token : ``
    
    ### input body
        none
  * **Code:** 400 BadRequest <br />
    **Content:** `{
  "message": "token require"
} `

OR

* **Error Response:**
    ### params
    
        id : `90`

    ### input header

        token : `<secretToken>`

    
    ### input body
        none

  * **Code:** 404 NotFound <br />
    **Content:** `{
  "message": "Data Not Found"
}`

* **Sample Call:**

  ```javascript
  axios
  .delete(`${process.env.BASE_URL}/categories/id`,{
      name:name
  })
