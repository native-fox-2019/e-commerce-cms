require('dotenv').config()
const express = require('express')
const routes = require('./routes')
const cors = require('cors')
const errorHandler = require('./middlewares/errorHandler')

const app = express()
const port = process.env.PORT || 4000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded( { extended:false } ))
app.use('/', routes)
app.use(errorHandler)
app.listen(port, () => {
    console.log("Listening on port "+ port)
})

// module.exports = app