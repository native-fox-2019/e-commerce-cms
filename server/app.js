
const express = require('express')
const routes = require('./routes')
const app = express()
const port =  4000

app.use(express.json())
app.use(express.urlencoded( { extended:false } ))
app.use('/', routes)
// error handler disini
app.listen(port, () => {
    console.log("Listening on port "+ port)
})

module.exports = app