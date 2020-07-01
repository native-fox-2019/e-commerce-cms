# e-commerce-cms


Check the website here: https://e-commerce-8696d.firebaseapp.com/
Server is hosted at here: https://sleepy-scrubland-83111.herokuapp.com/

You can log in as an admin using the account:

- Email: `adamsmith@gmail.com`
- Password: `adamsmith`

Features:

1. CRUD of items for admin.
2. Item display.
3. Order item by cart system for customer.
4. View all transactions and carts for admin.

 And here's the documentation:

## User

- **/register**

| Method | Header | Params | Data                                                      |
| ------ | ------ | ------ | --------------------------------------------------------- |
| `POST` | `none` | `none` | username: `string`<br>email: `string` <br> password: `string` |

| Success Response                                           | Error Response                                               |
| ---------------------------------------------------------- | ------------------------------------------------------------ |
| Status: `201` <br> Content: `{username, email, password}` | Status: `400` <br> Content: `{"message": 'Password must be longer than 8 characters!'}` |


- **/login**

| Method | Header | Params | Data                                    |
| ------ | ------ | ------ | --------------------------------------- |
| `POST` | `none` | `none` | email: `string` <br> password: `string` |

| Success Response                      | Error Response                                               |
| ------------------------------------- | ------------------------------------------------------------ |
| Status: `200` <br> Content: `{token}` | Status: `400` <br> Content: `{"message": "Wrong email/password!"}` |



- **/items/**
  Get all items from the database, no exception.

| Method | Header  | Params | Data   |
| ------ | ------- | ------ | ------ |
| `GET`  | `token` | `none` | `none` |

| Success Response                               | Error Response                                               |
| ---------------------------------------------- | ------------------------------------------------------------ |
| Status: `200` <br> Content: `array of objects` | Status: `500` <br> Content: `{"message": "Internal server error"}` |

- **/items/**
  Create a new item thread (only admin).

| Method | Header | Params | Data                                    |
| ------ | ------ | ------ | --------------------------------------- |
| `POST` | `token` | `none` | title: `string` <br> description: `string` <br> image_url: `string` <br> price: `integer` <br> stock: `integer` |

| Success Response                             | Error Response                                               |
| -------------------------------------------- | ------------------------------------------------------------ |
| Status: `200` <br> Content: `object of kanban card data` | Status: `400` <br> Content: `{"message": "Item name cannot be empty!"}` |

- **/items/:id**
  Update item's data.  This end point need authorization from verified user.

| Method | Header  | Params       | Data   |
| ------ | ------- | ------------ | ------ |
| `PUT`  | `token` | id: `string` | title: `string` <br> description: `string` <br> image_url: `string` <br> price: `integer` <br> stock: `integer` |

| Success Response                                      | Error Response                                     |
| ----------------------------------------------------- | -------------------------------------------------- |
| Status: `200` <br> Content: `object of updated data}` | Status: `404` <br> Content: `{"message": "Data not found!"}` |


- **/items/:id**
  Delete an item entry. This end point need authorization from verified user.

| Method   | Header  | Params       | Data   |
| -------- | ------- | ------------ | ------ |
| `DELETE` | `token` | id: `string` | `none` |

| Success Response                                     | Error Response                                     |
| ---------------------------------------------------- | -------------------------------------------------- |
| Status: `200` <br> Content: `object of deleted data` | Status: `400` <br> Content: `{"message": "You're not authorized to delete this entry!"}` |
