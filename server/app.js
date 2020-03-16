require('dotenv').config()
const cors = require('cors')
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const route = require('./routers')
const errorHandler = require('./middlewares/errorHandler')

app.use(cors())
app.use(express.urlencoded({ extended : false }))
app.use(express.json())

app.use('/', route)
app.use(errorHandler)

// app.listen(port, () => {
//     console.log('Listening on port ' + port)
// })

module.exports = app
