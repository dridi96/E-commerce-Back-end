const express = require('express')
const route = express.Router()
const OrderController = require('../controllers/orderController')
const {Authentification,verifyAdmin}= require ('../validation/UserAuthentification')

route.post('/' ,Authentification, OrderController.newOrder)
route.put('/:id',OrderController.UpdateDataOrder)
route.delete('/:id', OrderController.DeleteDataOrder)
route.get('/find/:userId',Authentification,OrderController.GetDataOrder)
route.get('/',OrderController.GetAllDataOrder)
route.get('/Orderstats',OrderController.GetOrderStats)




module.exports=route 