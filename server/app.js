require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT
const cors = require('cors')

app.use(cors)
app.use(express.urlencoded({extended:true}))
app.use(express.json)

app.listen(PORT, console.log(`Listening on PORT >>> ${PORT}`))

module.exports = app