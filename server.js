const express = require('express')
const mongoose = require ('mongoose')
require('dotenv').config()
const userRouter = require('./routes/userRouter')
const productRouter = require('./routes/productRouter')
const orderRouter = require ('./routes/orderRouter.js')
const cartRouter = require ('./routes/cartRouter.js')
const stripeRouter = require("./routes/stripeRouter")

const app = express()
app.use(express.json())
app.use('/api/users',userRouter)
app.use('/api/products' , productRouter)
app.use('/api/orders' ,orderRouter)
app.use('/api/carts',cartRouter)
app.use('/api/checkpayment',stripeRouter)


mongoose.connect(process.env.URL , err => err? console.log(err) : console.log("the DB is connecting"))

const port = process.env.port

app.listen(port , err => err ? console.log(err) : console.log(`the port is running on ${port}`) )