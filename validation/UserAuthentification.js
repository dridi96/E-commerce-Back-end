const jwt = require("jsonwebtoken");
require('dotenv').config()


const Authentification = async(req,res,next)=>{
    try {
        const token = req.header('token');
        const validToken = await jwt.verify(token,process.env.SECRET)
        if(!validToken){
            return res.status(400).json({message:'You are not authorized'})
        }
        req.UserId = validToken.id
        next()
    } catch (error) {
        return res.status(500).json({message: error})
    }
}


    //if the user is admin 
    const verifyAdmin = (req, res, next) => {
        Authentification(req, res, () => {
        if (req.User && req.User.isAdmin) {
            next();
        } else {
            return res.status(403).json({message:'Not authorized as an admin'});
        }
    });
    };
    

module.exports = {Authentification,verifyAdmin} 