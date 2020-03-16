const express = require('express')
const app = express()
const port = 3000

const ProductRouter = require('./routes/productRoutes')

app.use(express.urlencoded({extended: true}))
app.use(express.json)

app.use('/products', ProductRouter)

app.listen(port, ()=> console.log(`listening on port ${port}`))