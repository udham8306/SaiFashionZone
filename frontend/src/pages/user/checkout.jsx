import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const CheckoutPage = () => {
  // Use useLocation hook to access the passed state
  const location = useLocation();
  const { total, discount } = location.state || {};
  console.log(total)
  // State for address fields
  const [line1, setLine1] = useState('');
  const [line2, setLine2] = useState('');
  const [city, setCity] = useState('');
  const [pincode, setPincode] = useState('');
  const [mobile, setMobile] = useState('');

  // Default delivery fee
  const deliveryFee = 0; // Free delivery
  
  // Calculate coupon discount and grand total
  const couponDiscount = (total * (discount || 0)) / 100;
  const grandTotal = total + deliveryFee - couponDiscount;

  return (
    <div className="container mx-auto py-8">
      <div className="flex gap-8">
        {/* Left Side: Address Form */}
        <div className="w-2/3 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Shipping Address</h2>

          {/* Line 1 */}
          <input
            type="text"
            className="w-full p-4 border border-gray-300 rounded-lg mb-4"
            placeholder="Enter Line 1 (Street Address)"
            value={line1}
            onChange={(e) => setLine1(e.target.value)}
          />
          
          {/* Line 2 */}
          <input
            type="text"
            className="w-full p-4 border border-gray-300 rounded-lg mb-4"
            placeholder="Enter Line 2 (Optional)"
            value={line2}
            onChange={(e) => setLine2(e.target.value)}
          />
          
          {/* City */}
          <input
            type="text"
            className="w-full p-4 border border-gray-300 rounded-lg mb-4"
            placeholder="Enter City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          
          {/* Pincode */}
          <input
            type="text"
            className="w-full p-4 border border-gray-300 rounded-lg mb-4"
            placeholder="Enter Pincode"
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
          />
          
          {/* Mobile Number */}
          <input
            type="text"
            className="w-full p-4 border border-gray-300 rounded-lg mb-4"
            placeholder="Enter Mobile Number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
        </div>

        {/* Right Side: Order Summary */}
        <div className="w-1/3 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
          
          <div className="flex justify-between mb-4">
            <span>Total</span>
            <span>${total}</span>
          </div>
          <div className="flex justify-between mb-4">
            <span>Delivery Fee</span>
            <span className='text-green-500'>FREE</span>
          </div>
          <div className="flex justify-between mb-4">
            <span>Coupon Discount</span>
            <span>-Rs. {couponDiscount.toFixed(2)}</span>
          </div>
          
          <hr className="my-4" />

          <div className="flex justify-between text-xl font-semibold">
            <span>Grand Total</span>
            <span>Rs. {grandTotal.toFixed(2)}</span>
          </div>
          
          <button className="w-full bg-blue-500 text-white py-2 rounded-lg mt-6 hover:bg-blue-600 transition duration-200">
            Proceed to Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
