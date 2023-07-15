require('dotenv').config()
const path = require("path");

const express = require('express')


const setMiddlewares = require('./middleware/middleware')
const setRoutes = require('./route/route')

const app = express()

app.set('view engine', 'ejs')
app.set('views')
app.use(express.static('public'));



setMiddlewares(app)
setRoutes(app)



const PORT = process.env.PORT || 1000

app.listen(PORT,()=>{
    console.log("Server created success")
})
