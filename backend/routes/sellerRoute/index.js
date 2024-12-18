const express = require('express');
const sellerRouter = express.Router();
const { sellerSignUp, sellerSignIn } = require('../../controller/seller/sellerAuth');
const sellerDetailsController = require('../../controller/seller/sellerDetails');
const sellerAuthToken = require("../../middleware/sellerAuthToken");
const createProductController = require('../../controller/seller/productUpload');
const sellerLogout = require('../../controller/seller/sellerLogout');

// Seller routes for sign-up and sign-in
sellerRouter.post('/seller/signup', sellerSignUp);
sellerRouter.post('/seller/signin', sellerSignIn);
sellerRouter.get("/seller/details",sellerAuthToken,sellerDetailsController)
sellerRouter.post("/seller/uploadProduct",sellerAuthToken,createProductController)
sellerRouter.post("/seller/seller-logout",sellerLogout);
module.exports = sellerRouter;
