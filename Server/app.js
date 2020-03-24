require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const errorHandler = require('./Middlewares/errorHandler')
const port = process.env.PORT || 3003

const productRoutes = require('./Routes/productRoutes')
const userRoutes = require('./Routes/userRoutes')

app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use('/products', productRoutes)
app.use('/user', userRoutes)
app.use(errorHandler)

app.listen(port, () => {console.log('listeing on port: ', port)})

module.exports = app