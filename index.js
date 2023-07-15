require('dotenv').config()
const path = require("path");
const express = require('express')
const db=require('./config/database')


const setMiddlewares = require('./middleware/middleware')
const setRoutes = require('./route/route')

const app = express()

app.set('view engine', 'ejs')
app.set('views')
app.use(express.static('public'));



setMiddlewares(app)
setRoutes(app)

db.connect(function (err) {
    if (err) {
      return console.error("error: " + err.message);
    }
    console.log("Connected to the MySQL server.");
  });

const PORT = process.env.PORT || 1000

app.listen(PORT,()=>{
    console.log("Server created success")
})
