const express = require('express')
const app = express()
require('dotenv').config()
const path = require('node:path')

//
PORT = process.env.PORT

//routers requirements
userRouter = require('./routers/userRouter')


app.set('views', path.join(__dirname, 'views'))
app.set("view engine", "ejs")
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true}))



//routers
app.use('/', userRouter)




app.listen(PORT)