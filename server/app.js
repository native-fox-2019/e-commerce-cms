require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT || 4000
const index = require('./routes/index')
const cors = require('cors')

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }))

app.use('/', index)

app.listen(PORT, console.log('listening on port ' + PORT))

module.exports = app