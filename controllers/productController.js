const Product = require('../model/productSchema')

//create a new product 

const newProduct = async (req,res)=>{
    const Productcreate = new Product(req.body)
    try {
        const savedProduct = await Productcreate.save()
        return res.status(200).json(savedProduct)
    } catch (error) {
        return res.status(500).json({message:error})
    }
}

//update Product
const UpdateDataProduct = async(req,res)=>{
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id , req.body,{new:true})
        return res.status(200).json(updatedProduct)
    } catch (error) {
        return res.status(500).json({message:error})
    }
}

//delete Product 
const DeleteDataProduct = async(req,res)=>{
    try {
        const deleteProduct = await Product.findByIdAndDelete(req.params.id)
        return res.status(200).json({message:"the product has been deleted",deleteProduct})
    } catch (error) {
        return res.status(500).json({message:error})
    }
}

//get Product 
const GetDataProduct = async(req,res)=>{
    try {
        const getProduct = await Product.findById(req.params.id)
        return res.status(200).json(getProduct)
    } catch (error) {
        return res.status(500).json({message:error})
    }
}

//get All Product 
const GetAllDataProduct = async(req,res)=>{
    const queryProduct = req.query.new
    const queryCategory =req.query.category
    try {
        let getAllProduct;
    
        if (queryProduct) {
          getAllProduct = await Product.find({}).sort({ createdAt: -1 }).limit(1);
        } else if (queryCategory) {
          getAllProduct = await Product.find({
            categories: {
              $in: [queryCategory],
            },
          });
        } else {
          getAllProduct = await Product.find({});
        }
    
        return res.status(200).json(getAllProduct);
      } catch (error) {
        return res.status(500).json({message:error})
    }
}

module.exports={newProduct,UpdateDataProduct,DeleteDataProduct,GetDataProduct,GetAllDataProduct}