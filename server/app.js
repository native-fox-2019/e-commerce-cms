require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const router = require('./router')
const errorHandler = require('./errorHandler/errorHandler')

const port = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))
app.use(cors())

app.use('/', router)
app.use(errorHandler)

app.listen(port, () => {
    console.log('Listening on Port: ', port)
})

module.exports = app