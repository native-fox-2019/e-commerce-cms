require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const routerProduct = require('./routes/productRouter')
const routerUser = require('./routes/userRouter')
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/products' , routerProduct)
app.use('/users' , routerUser)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

module.exports = app