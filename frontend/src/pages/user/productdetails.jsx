import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FaMinus,
  FaPlus,
  FaShoppingCart,
  FaTag,
  FaStore,
} from "react-icons/fa";
import Navbar from "../../components/user/navbar/navbar";
import { Helmet } from "react-helmet";
import summaryApi from "../../common/user";
import { useAuth } from "../../context/AuthContext";
import { useSellerAuth } from "../../context/SellerAuthContext";

const ProductDetail = () => {
  const { productId } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [stockStatus, setStockStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const { user } = useAuth();
  const { sellerData } = useSellerAuth();
  // Fetch Product Details
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(summaryApi.productDetails(productId).url, {
          method: summaryApi.productDetails(productId).method,
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        if (data.success) {
          setProduct(data.data);
          calculateStockStatus(data.data);
          setSelectedImage(data.data.imgFiles[0]);
          setSelectedSize(data.data.sizes[0]);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    fetchProduct();
  }, [productId]);

  const calculateStockStatus = (productData) => {
    const stock = productData?.inStockValue || 0;
    let status = "";

    if (stock > 50) status = "In Stock";
    else if (stock > 10) status = "Low Stock";
    else if (stock > 0) status = "Very Low Stock";
    else status = "Out of Stock";

    setStockStatus({ status, stock });
  };

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= (stockStatus?.stock || 1)) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = async () => {
    const userId = user?._id;
    const sellerId = sellerData._id;
    if (!userId) {
      toast.error("Please login to add items to your cart.");
      return;
    }

    if (stockStatus?.stock === 0) {
      toast.error("Sorry, this product is currently out of stock.");
      return;
    }

    try {
      const response = await fetch(summaryApi.addToCart.url, {
        method: summaryApi.addToCart.method,
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, productId, sellerId, quantity }),
      });

      const data = await response.json();
      if (data.success) {
        toast.success(
          <span
            className="cursor-pointer text-blue-600"
            onClick={() => navigate("/cart")}
          >
            Product added! Go to Cart →
          </span>
        );
      } else toast.error("Failed to add item to cart.");
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Something went wrong!");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-16 h-16 border-4 border-t-4 border-t-pink-600 border-pink-200 rounded-full"
        />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{product.name} | SaiFashionZone By Raiba</title>
      </Helmet>

      <ToastContainer />

      <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white py-12 ">
        <div className="max-w-6xl mx-auto px-4 flex gap-10 stickey">
          {/* Left Image Gallery with Sticky Positioning */}
          <div className="w-1/2 flex items-start sticky top-28 h-fit">
            {/* Thumbnails on the Left */}
            <div className="flex flex-col space-y-2">
              {product.imgFiles.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt="Thumbnail"
                  onClick={() => setSelectedImage(img)}
                  className={`w-24 h-24 object-contain rounded-lg cursor-pointer ${
                    selectedImage === img && "border-2 border-pink-600"
                  }`}
                />
              ))}
            </div>

            {/* Full Preview Image Immediately to the Right */}
            <div className="ml-4 flex-1">
              <img
                src={selectedImage}
                alt={product.name}
                className="w-full h-[500px] object-contain rounded-2xl"
              />
            </div>
          </div>

          {/* Right Scrollable Product Details */}
          <div className="w-1/2 space-y-6 overflow-y-auto">
            <h1 className="text-4xl font-bold text-pink-600">{product.name}</h1>
            <div className="text-3xl font-semibold text-gray-800">
              ₹{product.sellingPrice}{" "}
              <span className="text-xl text-gray-400 line-through">
                ₹{product.price}
              </span>
              {/* Calculate and display the discount percentage */}
              <span className="ml-4 text-lg text-red-600">
                (
                {(
                  ((product.price - product.sellingPrice) / product.price) *
                  100
                ).toFixed(0)}
                % OFF)
              </span>
            </div>

            <div className="flex items-center space-x-4">
              <span
                className={`px-4 py-2 rounded-full text-white ${
                  stockStatus?.status === "Out of Stock"
                    ? "bg-red-500"
                    : "bg-green-500"
                }`}
              >
                {stockStatus?.status}
              </span>
              <div className="flex items-center">
                <FaTag className="text-pink-600 mr-2" />
                <span>{product.category}</span>
              </div>
            </div>

            {/* Size Selector */}
            <div>
              <label className="block text-gray-600">Select Size:</label>
              <select
                className="mt-2 w-full border rounded px-4 py-2"
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
              >
                {product.sizes.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center space-x-6">
              {/* Quantity Selector */}
              <div className="flex items-center space-x-2 w-32">
                {" "}
                {/* Adjust width here */}
                <button
                  className="bg-gray-200 px-4 py-2 rounded w-12"
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                >
                  <FaMinus />
                </button>
                <span className="w-12 text-center">{quantity}</span>{" "}
                {/* Adjust width and center text */}
                <button
                  className="bg-gray-200 px-4 py-2 rounded w-12"
                  onClick={() => handleQuantityChange(1)}
                  disabled={quantity >= stockStatus?.stock}
                >
                  <FaPlus />
                </button>
              </div>

              {/* Add to Cart */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={handleAddToCart}
                className={`w-56 py-4 rounded-xl text-white ${
                  stockStatus?.status === "Out of Stock"
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-pink-600 hover:bg-pink-700"
                }`}
                disabled={stockStatus?.status === "Out of Stock"}
              >
                <FaShoppingCart className="inline-block mr-2" />
                Add to Cart
              </motion.button>
            </div>

            {/* Seller Information */}
            <div className="flex items-center space-x-4 bg-gray-50 p-4 rounded-lg">
              <img
                src={product.seller.profilePic}
                alt="Seller"
                className="w-12 h-12 rounded-full"
              />
              <div>
                <p className="font-bold">{product.seller.shopName}</p>
                <p className="text-gray-600">Seller: {product.seller.name}</p>
              </div>
            </div>
            <section className="my-8">
              <h1 className="text-2xl font-semibold text-gray-800 mb-4">
                Product Description
              </h1>
              <p className="text-gray-600 text-lg">{product.description}</p>
            </section>
            {/* Specification Section */}
            {product.specifications && product.specifications.length > 0 && (
              <div className="bg-gray-100 p-4 rounded-lg">
                <h2 className="text-2xl font-bold mb-4">Specifications</h2>
                {product.specifications.map((spec, index) => (
                  <div key={index} className="mb-6">
                    {/* Specification Name */}
                    <h3 className="text-xl font-semibold mb-2">{spec.name}</h3>

                    {/* Table for Properties */}
                    {spec.properties && spec.properties.length > 0 && (
                      <div className="overflow-x-auto">
                        <table className="table-auto w-full border-collapse border border-gray-300">
                          <thead>
                            <tr className="bg-gray-200"></tr>
                          </thead>
                          <tbody>
                            {spec.properties.map((property, propIndex) => (
                              <tr
                                key={`${index}-${propIndex}`}
                                className="hover:bg-gray-50"
                              >
                                <td className="border border-gray-300 px-4 py-2">
                                  {property.key}
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                  {property.value}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
