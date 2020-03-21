1. POST /user/register
Example Input (Request Body):

{
    "email": "test@mail.com",
    "password": "test"
}
Response (201):

{
       access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsImVtYWlsIjoiZXhwYW1wbGVAZXhhbXBsZS5jb20iLCJpYXQiOjE1ODM1NjQyODF9.jvh2CegZlsax09Cp_wcSiOed_84BUJTHJuC1IDAiTXs"
} 
Example Input (Request Body) :

{
    "email": ,
    "password": "test"
}
Response ERROR (401):

{
    msg:"email and password must be filled"
}


2. POST /user/login
Example Input (Request Body):

{
    "email": "test@mail.com",
    "password": "test"
}
Response (200):

   {
       access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsImVtYWlsIjoiZXhwYW1wbGVAZXhhbXBsZS5jb20iLCJpYXQiOjE1ODM1NjQyODF9.jvh2CegZlsax09Cp_wcSiOed_84BUJTHJuC1IDAiTXs"
   } 
Example Input (Request Body) :

{
    "email": "test@mail.com",
    "password": "apa" ,	
}
Response ERROR (404):

{ 
    msg:"id or email is not found" 
}

Shopper
Url	Method	Description
/product/	POST	Menambahkan produk baru
/product/	GET	Menampilkan list produk
/product/:id	GET	Menampilkan produk berdasarkan id
/product/:id	PUT	Melakukan edit ke produk
/product/:id	DELETE	Menghapus produk dari list
1. POST /product
Example Input (Request Headers):

{
    eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJmYXV6YW5AZW1haWwuY29tIiwiaWF0IjoxNTgzMjI0NDUzfQ.f9xFh_GctsZvEDEgdlmMYU13CPOlOdD4Btme8oi0tgA

}
Example Input (Request Body):

{
	"name" : "test",
    "image_url" : "test.com",
    "price": "150000",
    "stock": "1"
}
Response (201):

{
    "id":1
	"name" : "test",
    "image_url" : "test.com",
    "price": "150000",
    "stock": "1"
}


Example Input:

{
	"name" : ,
    "image_url" : "test.com",
    "price": "150000",
    "stock": "1"
}
Response ERROR (500):

{
	message: "Internal server error"
}

2. GET /product
Example Input (Request Headers):

{
    eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJmYXV6YW5AZW1haWwuY29tIiwiaWF0IjoxNTgzMjI0NDUzfQ.f9xFh_GctsZvEDEgdlmMYU13CPOlOdD4Btme8oi0tgA

}
Response (200):

[
    {
    "id":1
	"name" : "test",
    "image_url" : "test.com",
    "price": "150000",
    "stock": "1"
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
    }
]
Example Input (Request Headers) :

{
 eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJmYXV6YW5AZW1haWwuY29tIiwiaWF0IjoxNTgzMjI0NDUzfQ.f9xFh_GctsZvEDEgdlmMYU13CPOlOdD4Btme8oi0tgA   	
}
Response ERROR (404):

{
	msg: "data is not found"
}

3. GET /product/:id
Example Input (Request Headers):

{
    eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJmYXV6YW5AZW1haWwuY29tIiwiaWF0IjoxNTgzMjI0NDUzfQ.f9xFh_GctsZvEDEgdlmMYU13CPOlOdD4Btme8oi0tgA
}
Response (200):

{
    "id":1
	"name" : "test",
    "image_url" : "test.com",
    "price": "150000",
    "stock": "1"
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
}
Example Input (Request Headers):

{
    
}
Response ERROR (404):

{
	msg: "data is not found"
}
4. PUT /product/:id
Example Input (Request Headers):

{
    eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJmYXV6YW5AZW1haWwuY29tIiwiaWF0IjoxNTgzMjI0NDUzfQ.f9xFh_GctsZvEDEgdlmMYU13CPOlOdD4Btme8oi0tgA
}
Example Input (Request Body):

{
	"name" : "test",
    "image_url" : "test.com",
    "price": "150000",
    "stock": "5"
}
Response (200):

{
	"name" : "test",
    "image_url" : "test.com",
    "price": "150000",
    "stock": "5"
}
Example Input (Request Headers):

{
    eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJmYXV6YW5AZW1haWwuY29tIiwiaWF0IjoxNTgzMjI0NDUzfQ.f9xFh_GctsZvEDEgdlmMYU13CPOlOdD4Btme8

}
Example Input (Request Body):

{{
	"name" : "test",
    "image_url" : "test.com",
    "price": "150000",
    "stock": "5"
}
Response ERROR (403):

{
	message: "not authorized"
}
Response ERROR (400):

	{
        msg: "update fail"
    }

5. DELETE /product/:id
Example Input (Request Headers):

{
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJmYXV6YW5AZW1haWwuY29tIiwiaWF0IjoxNTgzMjI0NDUzfQ.f9xFh_GctsZvEDEgdlmMYU13CPOlOdD4Btme8oi0tgA
}
Response (200):

{
    "id":1
	"name" : "test",
    "image_url" : "test.com",
    "price": "150000",
    "stock": "1"
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
}

Example Input (Request Headers):

{
    eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJmYXV6YW5AZW1haWwuY29tIiwiaWF0IjoxNTgzMjI0NDUzfQ.f9xFh_GctsZvEDEgdlmMYU13CPOlOdD4Btme8

}
Example Input (Request Body):

{
    "id":1
	"name" : "test",
    "image_url" : "test.com",
    "price": "150000",
    "stock": "1"
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
}
Response ERROR (403):

{
	message: "not authorized"
}
Response ERROR (404):

{
	msg: "data is not found"
}