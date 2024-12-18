import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CartItems from "../../components/user/cart/Cartitems";
import RecentlyViewed from "../../components/user/cart/recentlyviewed";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Helmet } from "react-helmet";
import summaryApi from "../../common/user";
import { useAuth } from "../../context/AuthContext";

const ShoppingCartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { user } = useAuth();
  const userId = user?._id;
  const fetchCartItems = async () => {
    try {
      const response = await fetch(summaryApi.getCartItems.url, {
        method: summaryApi.getCartItems.method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Await response.json() to ensure it's resolved before proceeding
      const responseData = await response.json(); // Use await here

      console.log(responseData.data); // Log the fetched data
      setCartItems(responseData.data); // Set the fetched cart items
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch cart items");
      setLoading(false);
    }
  };
  useEffect(() => {
    // Fetch cart items when the component mounts

    fetchCartItems();
  }, [userId]); // Dependency on userId to trigger re-fetching when the userId changes

  return (
    <div className="bg-pink-50 min-h-screen">
      <Helmet>
        <title>Shopping Cart | SaiFashionZone By Raiba</title>
      </Helmet>

      <div className="container mx-auto px-4 py-8 space-y-6">
        <div className="bg-white shadow-md rounded-lg">
          <div className="p-4 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-800">Shopping Cart</h1>
            <Link
              to="/shop"
              className="flex items-center space-x-2 text-pink-600 hover:text-pink-800 transition-colors"
            >
              <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
              Continue Shopping
            </Link>
          </div>
        </div>

        {/* Content Section */}
        <div className="grid grid-cols-1 gap-6">
          {loading ? (
            <p>Loading cart items...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <>
              <CartItems Items={cartItems} fetchCartItems={fetchCartItems} />{" "}
              {/* Pass the cart items to CartItems */}
              {/* <RecentlyViewed /> */}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShoppingCartPage;
