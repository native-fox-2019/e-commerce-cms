const express = require('express')
const app = express()
const errorHandler = require('./Middlewares/errorHandler')
const port = process.env.PORT || 3003

const productRoutes = require('./Routes/productRoutes')

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use('/products', productRoutes)
app.use(errorHandler)

// app.listen(port, () => {console.log('listeing on port: ', port)})

module.exports = app