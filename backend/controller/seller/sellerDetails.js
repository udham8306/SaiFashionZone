const jwt = require('jsonwebtoken');
const Seller = require("../../models/sellerModel")
async function sellerDetailsController(req,res,next)
{
   
    try{
        
        const seller = await Seller.findById(req.seller.sellerId)
        res.status(200).json(
           { 
               data : seller,
               message : "Seller Details",
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

module.exports = sellerDetailsController;