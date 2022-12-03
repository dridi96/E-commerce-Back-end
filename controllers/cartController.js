const Cart = require('../model/cartSchema')

//create Cart 

const newCart = async(req,res)=>{
    const createdCart = new Cart(req.body)
    try {
        const savedCart = await createdCart.save()
        return res.status(200).json(savedCart)
    } catch (error) {
        return res.status(500).json({message:error})
    }
}

// update Cart 

const UpdateDataCart = async(req,res)=>{
    try {
        const updateCart = await Cart.findByIdAndUpdate(req.params.id,req.body,{new:true})
        return res.status(200).json(updateCart)
    } catch (error) {
        return res.status(500).json({message:error})
    }
}

//delete cart 
const DeleteDataCart = async(req,res)=>{
    try {
        const deleteCart = await Cart.findByIdAndDelete(req.params.id)
        return res.status(200).json({message:"cart has been deleted",deleteCart})
    } catch (error) {
        return res.status(500).json({message:error})
    }
} 

//get Cart 
const GetDataCart = async(req,res)=>{
    try {
        const getCart = await Cart.findOne({userId:req.params.userId})
        return res.status(200).json(getCart)
    } catch (error) {
        return res.status(500).json({message:error})
    }
}

//get All Cart 
const GetAllDataCart = async(req,res)=>{
    try {
        const getAllCart = await Cart.find({})
        return res.status(200).json(getAllCart)
    } catch (error) {
        return res.status(500).json({message:error})
    }
}




module.exports={newCart,UpdateDataCart,DeleteDataCart,GetDataCart,GetAllDataCart}