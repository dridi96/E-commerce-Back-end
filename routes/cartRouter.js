const express = require('express')
const route = express.Router()
const CartController = require('../controllers/cartController')
const {Authentification} = require('../validation/UserAuthentification')

route.post('/' ,Authentification, CartController.newCart)
route.put('/:id',Authentification,CartController.UpdateDataCart)
route.delete('/:id', Authentification, CartController.DeleteDataCart)
route.get('/find/:userId',Authentification,CartController.GetDataCart)
route.get('/',Authentification,CartController.GetAllDataCart)


module.exports=route 