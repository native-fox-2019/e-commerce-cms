if (process.env.NODE_ENV === `test` || process.env.NODE_ENV === `development`) {
    require(`dotenv`).config()
}

const express = require(`express`)
const app = express()
const cors = require(`cors`)
const errorHandler = require(`./middleware/errorHandler`)

const router = require(`./routes`)

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(`/`, router)

app.use(errorHandler)

// app.listen(3000, () => console.log(`Jamming in Port 3000`))

module.exports = app