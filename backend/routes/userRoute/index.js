const express = require("express");
const router = express.Router();

const userSignUpController = require("../../controller/user/userSignUp");
const userSignInController = require("../../controller/user/userSignIn");
const userDetailsController = require("../../controller/user/userDetails");
const authToken = require("../../middleware/authToken");
const allProductsController = require("../../controller/user/allProducts");
const getProductDetailsController = require("../../controller/user/productDetails");
const addToCartController = require("../../controller/user/addToCartController");
const getCartItemsController = require("../../controller/user/getCartDetails");
const quantityController = require("../../controller/user/changeQuantity");
const removeCartItemController = require("../../controller/user/removeCartItemController");
const userLogout = require("../../controller/user/userLogout");

router.post("/signup", userSignUpController);
router.post("/login", userSignInController);
router.get("/user-details", authToken, userDetailsController);
router.get("/all-products", allProductsController);
router.get("/product-details/:productId", getProductDetailsController);
router.post("/addcart-product", authToken , addToCartController)
router.get("/get-cart-items",authToken,getCartItemsController);
router.put("/change-quantity",authToken,quantityController);
router.put("/remove-cartItem",authToken,removeCartItemController)
router.put("/user-logout",userLogout);
module.exports = router;
