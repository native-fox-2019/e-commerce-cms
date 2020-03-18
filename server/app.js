require('dotenv').config()
const express = require ('express')
const app = express()
var cors = require('cors')
const PORT = 3000 || process.env.PORT
const router = require('./routes')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/',router)

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))