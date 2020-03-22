const express = require('express')
const app = express()
const port = 3000
const cors = require('cors')

const ProductRouter = require('./routes/productRouter')
const UserRouter = require('./routes/userRouter')

const errorHandler = require('./middleware/errorHandler')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.get('/', (req, res)=>res.send("e-commerce"))
app.use('/products', ProductRouter)
app.use('/user', UserRouter)

app.use(errorHandler)

app.listen(port, ()=> console.log(`listening on port ${port}`))