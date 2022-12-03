const express = require('express')
const route = express.Router()
const productController = require('../controllers/productController')

route.post('/' ,productController.newProduct)
route.put('/:id',productController.UpdateDataProduct)
route.delete('/:id',productController.DeleteDataProduct)
route.get('/find/:id' ,productController.GetDataProduct)
route.get('/' , productController.GetAllDataProduct)

module.exports=route 