'use strict'
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const port = process.env.PORT || 3000
const router = require('./routes/index')
const app = express()
const errorHandler = require('./middlewares/errorHandler')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(router)
app.use(errorHandler)

app.listen(port, () => console.log('listening to port', port))

// module.exports = app