const backendDomain = "sai-fashion-zone-8af9.vercel.app";

const sellerSummaryApi = {
  signUp: {
    url: `${backendDomain}/api/seller/signup`,
    method: "POST",
  },
  signIn: {
    url: `${backendDomain}/api/seller/signin`,
    method: "POST",
  },
  sellerDetails: {
    url: `${backendDomain}/api/seller/details`,
    method: "GET",
  },
  uploadProduct :{
    url: `${backendDomain}/api/seller/uploadProduct`,
    method: "POST",
  },
  sellerlogout:{
    url: `${backendDomain}/api/seller/seller-logout`,
    method: "POST",
  }
};

export default sellerSummaryApi;
