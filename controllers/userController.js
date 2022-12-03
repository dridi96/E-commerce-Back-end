const User = require ('../model/userSchema.js')
const {validationResult}= require ( "express-validator")
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const Register = async(req,res)=>{
    try {
        // Finds the validation errors
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({errors : errors.mapped()})
        }

        const {username,email,password} = req.body
        //check
        const saved = await User.findOne({email})
        if (saved){
            return res.status(400).json({message:'Email already in use'})
        }

        //cryptage
        const salt = await bcrypt.genSalt(10);
        const passwordCrypte = await bcrypt.hash(password, salt);

        // User Creation 
        const newUser = await User.create({username,email,password:passwordCrypte})

        //token
        const token = await jwt.sign({id:newUser._id },process.env.SECRET, {expiresIn:'30d'})
        res.status(201).json({newUser,token})

    } catch (error) {
        return res.json({message:error})
    }
}

    //login 
    const Login = async(req,res)=>{
        try {
            const errors = validationResult(req)
                if (!errors.isEmpty()){
                    return res.status(400).json({errors:errors.mapped()})
                }

                const {email,password} = req.body
                // vérification
                const found = await User.findOne({email})
                if (!found){
                    return res.status(400).json({message: 'Cannot find user, you have to register'})
                }

                // compare password
                const matchedPassword = await bcrypt.compare(password , found.password)
                if (!matchedPassword){
                    return res.status(400).jason({message:'Wrong Password'})
                } 
                //else {
                //     return res.send('Success')
                // }

                //regenerate token
                const tokenvalidate = await jwt.sign({id:found._id,
                    isAdmin:User.isAdmin },
                    process.env.SECRET)
                return res.status(200).json({found,tokenvalidate})
        } catch (error) {
            return res.status(500).json({message:error})
    }

}


//update user
const UpdateDataUsers = async(req,res)=>{
    try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id,req.body,{new:true})
        return res.status(200).json(updatedUser)
    } catch (error) {
        return res.status(500).json({message:error})
    }
}

 //delete user 

const DeleteDataUser = async(req,res)=>{
    try {
        const deleteuser = await User.findByIdAndDelete(req.params.id)
        return res.status(200).json({message:"the user has been deleted",deleteuser}) 
        
    } catch (error) {
        return res.status(500).json(error)
    }
}


 //Get users 
const GetDataUser = async(req,res)=>{
    try {
        const GetUser = await User.findById(req.params.id).select("-password -__v")
        return res.status(200).json(GetUser)
    } catch (error) {
        return res.status(500).json({message: error})
    }
}

 //Get All Users

const GetAllDataUsers = async(req,res)=>{
    try {
        const query = req.query.new
        const GerALLUsers = query? await User.find({}).sort({_id:-1}).limit(1) : await User.find({})
        return res.status(200).json(GerALLUsers)
    } catch (error) {
        return res.status(500).json({message:error})
    }
}

//Get User Stat
const GetDataUsersStat =async (req,res)=>{
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear()-1))
    try {
        const GetUsersStat = await User.aggregate([
            {$match:{createdAt : {$get:lastYear}}},
            {$project:{
                month : {$month : "$createdAt"}
            }},
            {$group : {
                _id :"$month",
                total : {$sum:1}
            }}
        ])
        return res.status(200).json(GetUsersStat)
    } catch (error) {
        return res.status(500).json({message:error})
    }
}

module.exports ={Register, Login ,UpdateDataUsers,DeleteDataUser,GetDataUser,GetAllDataUsers,GetDataUsersStat}