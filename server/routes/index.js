const routes = require('express').Router()

routes.get('/', (req, res, next) => {
    res.status(200).send("Hope the Test passed")
})

module.exports = routes