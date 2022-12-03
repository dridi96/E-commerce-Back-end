const Order = require('../model/orderSchema')

//create Order 

const newOrder = async(req,res)=>{
    const createdOrder = new Order(req.body)
    try {
        const savedOrder = await createdOrder.save()
        return res.status(200).json(savedOrder)
    } catch (error) {
        return res.status(500).json({message:error})
    }
}


// update Order 

const UpdateDataOrder = async(req,res)=>{
    try {
        const updateOrder = await Order.findByIdAndUpdate(req.params.id,req.body,{new:true})
        return res.status(200).json(updateOrder)
    } catch (error) {
        return res.status(500).json({message:error})
    }
}

//delete Order 
const DeleteDataOrder = async(req,res)=>{
    try {
        const deleteOrder = await Order.findByIdAndDelete(req.params.id)
        return res.status(200).json({message:"Order has been deleted",deleteOrder})
    } catch (error) {
        return res.status(500).json({message:error})
    }
} 

//get Order 
const GetDataOrder = async(req,res)=>{
    try {
        const getOrder = await Order.find({userId:req.params.userId})
        return res.status(200).json(getOrder)
    } catch (error) {
        return res.status(500).json({message:error})
    }
}

//get All Order 
const GetAllDataOrder = async(req,res)=>{
    try {
        const getAllOrder = await Order.find({})
        return res.status(200).json(getAllOrder)
    } catch (error) {
        return res.status(500).json({message:error})
    }
}

// GET MONTHLY INCOME

const GetOrderStats = async (req, res) => {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
  
    try {
      const income = await Order.aggregate([
        { $match: { createdAt: { $gte: previousMonth } } },
        {
          $project: {
            month: { $month: "$createdAt" },
            sales: "$amount",
          },
        },
        {
          $group: {
            _id: "$month",
            total: { $sum: "$sales" },
          },
        },
      ]);
      res.status(200).json(income);
    } catch (err) {
      res.status(500).json(err);
    }
  };




module.exports={newOrder,UpdateDataOrder,DeleteDataOrder,GetDataOrder,GetAllDataOrder,GetOrderStats}