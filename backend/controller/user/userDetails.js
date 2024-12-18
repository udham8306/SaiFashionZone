const jwt = require('jsonwebtoken');
const User = require("../../models/userModel")
async function userDetailsController(req,res,next)
{
   
    try{
        
        const user = await User.findById(req.user._id)
        res.status(200).json(
           { 
               data : user,
               message : "User Details",
               error : false,
               success : true,
           }
        )
        // console.log(user)
    }
    catch(error){
        res.status(404).json(
            {
                message : error.message ||error ,
                error :true,
                success :false,

            }
        )
    }
}

module.exports = userDetailsController;