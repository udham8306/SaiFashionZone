import React, { useState, useEffect } from "react";
import { faTrash, faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import emptyCart from "../../Images/empty_cart.webp";
import { Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import summaryApi from "../../../common/user";

const CartItems = ({ Items }) => {
  const [cartItems, setCartItems] = useState(Items || []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [voucher, setVoucher] = useState("");

  const { user } = useAuth();
  const userId = user?._id;
  const [discountInfo, setDiscountInfo] = useState({
    code: "",
    percentage: 0,
    message: "",
  });
  const VOUCHERS = {
    OFF10: { percentage: 0.1, message: "10% discount applied!" },
  };

  const handleQuantityChange = async (itemId, change) => {
    const item = cartItems.find((item) => item._id === itemId);
    if (!item) return;

    const newQuantity = item.quantity + change;

    // Ensure quantity is at least 1
    if (newQuantity >= 1) {
      try {
        // API call to update quantity
        const response = await fetch(summaryApi.changeQuantity.url, {
          method: summaryApi.changeQuantity.method,
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            cartItemId: itemId,
            quantity: newQuantity,
          }),
        });

        const data = await response.json();
        fetchCartItems();
        if (data.success) {
          console.log("Quantity updated successfully");
        } else {
          console.error("Failed to update quantity:", data.message);
        }
      } catch (err) {
        console.error("Error updating quantity:", err);
      }
    } else {
      console.error("Quantity cannot be less than 1");
    }
  };

  // Function to fetch updated cart items from backend
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

  const handleRemoveItem = async (itemId) => {
    try {
      const response = await fetch(summaryApi.removeCartItem.url, {
        method: summaryApi.removeCartItem.method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cartItemId: itemId,
        }),
      });
      const data = await response.json();
      fetchCartItems();
      console.log(data);
      if (data.success) {
      }
    } catch (err) {
      console.error("Error removing item:", err);
    }
  };

  const calculateTotal = () => {
    const subtotal = cartItems.reduce((total, item) => {
      const numericPrice = parseFloat(item.product.sellingPrice); // Assuming sellingPrice is a number
      return total + numericPrice * item.quantity;
    }, 0);
    const discountedTotal = subtotal * (1 - discountInfo.percentage);
    return discountedTotal.toFixed(2);
  };

  const handleVoucherRedeem = () => {
    const normalizedVoucher = voucher.toUpperCase().trim();

    if (VOUCHERS[normalizedVoucher]) {
      setDiscountInfo({
        code: normalizedVoucher,
        percentage: VOUCHERS[normalizedVoucher].percentage,
        message: VOUCHERS[normalizedVoucher].message,
      });
    } else {
      setDiscountInfo({
        code: "",
        percentage: 0,
        message: "Invalid voucher code",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 bg-pink-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-pink-600"></div>
      </div>
    );
  }

  if (error || cartItems.length === 0) {
    return (
      <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center justify-center">
        <img src={emptyCart} alt="Empty Cart" className="w-48 h-48 mb-4" />
        <p className="text-lg text-gray-600 mb-4">
          {error || "Your cart is empty"}
        </p>
        <Link
          to="/shop"
          className="px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white shadow-md rounded-lg">
        <div className="p-4 border-b">
          <h2 className="text-xl font-bold text-gray-800">Your Cart</h2>
        </div>
        <div className="p-4 space-y-4">
          {cartItems.length > 0 &&
            cartItems?.map((item) => (
              <div
                key={item?._id}
                className="flex items-center justify-between border-b pb-4 last:border-b-0"
              >
                {/* Link wraps only the image and product name */}
                <div className="flex items-center space-x-4">
                  <Link to={`/product/${item?.product._id}`}>
                    <div className="w-20 h-20 bg-gray-100 rounded-md overflow-hidden">
                      <img
                        src={item?.product.imgFiles[0]}
                        alt={item?.product.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </Link>
                  <Link to={`/product/${item?.product._id}`}>
                    <h3 className="font-semibold text-base">
                      {item?.product.name}
                    </h3>
                  </Link>
                </div>

                {/* Quantity and Pricing Section */}
                <div className="flex items-center space-x-4">
                  <span className="font-medium text-base">
                    Rs. {item?.product.sellingPrice}
                  </span>

                  <div className="flex items-center border rounded-md">
                    <button
                      onClick={() => handleQuantityChange(item?._id, -1)}
                      className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                    >
                      <FontAwesomeIcon icon={faMinus} className="text-sm" />
                    </button>
                    <input
                      type="text"
                      value={item?.quantity}
                      readOnly
                      className="w-12 text-center border-none text-sm"
                    />
                    <button
                      onClick={() => handleQuantityChange(item?._id, 1)}
                      className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                    >
                      <FontAwesomeIcon icon={faPlus} className="text-sm" />
                    </button>
                  </div>

                  <span className="font-medium text-base">
                    Rs.{" "}
                    {(
                      parseFloat(item?.product.sellingPrice) * item?.quantity
                    ).toFixed(2)}
                  </span>

                  <button
                    onClick={() => handleRemoveItem(item?._id)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg">
        <div className="p-4 border-b">
          <h2 className="text-xl font-bold text-gray-800">Order Summary</h2>
        </div>
        <div className="p-4 space-y-4">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="Enter voucher code"
              value={voucher}
              onChange={(e) => setVoucher(e.target.value)}
              className="flex-grow border rounded-md px-3 py-2"
            />
            <button
              className="bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-600"
              onClick={handleVoucherRedeem}
            >
              Redeem
            </button>
          </div>

          {discountInfo.message && (
            <div
              className={`text-sm ${
                discountInfo.code ? "text-green-600" : "text-red-600"
              }`}
            >
              {discountInfo.message}
            </div>
          )}

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>
                Rs.{" "}
                {cartItems
                  .reduce(
                    (total, item) =>
                      total +
                      parseFloat(item?.product.sellingPrice) * item?.quantity,
                    0
                  )
                  .toFixed(2)}
              </span>
            </div>
            {discountInfo.percentage > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Discount ({discountInfo.percentage * 100}%)</span>
                <span>
                  - Rs.{" "}
                  {(
                    cartItems.reduce(
                      (total, item) =>
                        total +
                        parseFloat(item?.product.sellingPrice) * item?.quantity,
                      0
                    ) * discountInfo.percentage
                  ).toFixed(2)}
                </span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>Rs. 0.00</span>
            </div>
            <div className="flex justify-between font-bold text-base">
              <span>Total</span>
              <span>Rs. {calculateTotal()}</span>
            </div>
          </div>

          <Link
            to="/checkout"
            state={{
              total : calculateTotal(), // Pass the total price to checkout
              discount: discountInfo.percentage, // Pass the discount percentage to checkout
            }}
            className="block"
          >
            <button className="w-full bg-pink-500 text-white py-2 rounded-md hover:bg-pink-600">
              Proceed to Checkout
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
