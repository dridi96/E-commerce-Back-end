const express = require('express')
const route = express.Router()
const userController = require('../controllers/userController')
const {UserValidation} = require('../validation/Authentification')
const {Authentification,verifyAdmin}= require ('../validation/UserAuthentification')

route.post('/register',UserValidation,userController.Register)
route.post('/login' ,userController.Login)
route.put('/:id' ,Authentification, userController.UpdateDataUsers)
route.delete('/:id',Authentification,userController.DeleteDataUser)
route.get('/:id' ,verifyAdmin,userController.GetDataUser)
route.get('/' ,verifyAdmin,userController.GetAllDataUsers )
route.get('/stats' ,userController.GetDataUsersStat)


module.exports=route 