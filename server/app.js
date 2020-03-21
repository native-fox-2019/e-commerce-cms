  require('dotenv').config()
const express = require ('express')
const app = express()
const cors = require('cors')
const PORT = process.env.PORT||3000
const http = require('http').createServer(app);
const io = require('socket.io')(http)
const router = require('./routes')

io.on("connection", socket => {
    console.log("ADA YG MASUK");
    socket.on("disconnect", () => {
      console.log("ADA YG KELUAR");
    });
  });

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/',router)

// app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))
http.listen(PORT, function() {
    console.log(`listening on ${PORT}`);
  });
// module.exports = app