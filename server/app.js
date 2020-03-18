const express =require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const port = process.env.port || 3000
const router = require('./route')
const errorHandler = require('./helper/errhandler')

app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use('/',router)
app.use(errorHandler)


app.listen(port, ()=>{
    console.log('running on port',port)
})

module.exports = app
