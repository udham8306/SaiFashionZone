
const backendDomain = "https://saifashionzone-backend.onrender.com";

const summaryApi = {
  signUp: {
    url: `${backendDomain}/api/signup`,
    method: "POST",
  },
  signIn: {
    url: `${backendDomain}/api/login`,
    method: "POST",
  },
  userDetails: {
    url: `${backendDomain}/api/user-details`,
    method: "GET",
  },
  allProducts: {
    url: `${backendDomain}/api/all-products`,
    method: "GET",
  },
  productDetails : (productId) => ({
    url: `${backendDomain}/api/product-details/${productId}`, // Updated to include productId
    method: "GET",
  }),
  addToCart :{
    url: `${backendDomain}/api/addcart-product`,
    method: "POST",
  },
  getCartItems :{
    url: `${backendDomain}/api/get-cart-items`,
    method: "GET",
  },
  changeQuantity : {
    url: `${backendDomain}/api/change-quantity`,
    method: "PUT",
  },
  removeCartItem : {
    url: `${backendDomain}/api/remove-cartItem`,
    method: "PUT",
  },
  userlogout :{
    url: `${backendDomain}/api/user-logout`,
    method: "PUT",
  }
};

export default summaryApi;
