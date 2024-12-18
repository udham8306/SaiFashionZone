// PromoBanner.js
import React from "react";
import { FaGift } from "react-icons/fa";

const PromoBanner = ({ scrolled }) => {
  return (
    <div
      className={`bg-pink-600 text-white py-2 text-center text-xs transition-all duration-300 ${
        scrolled ? "opacity-0 h-0 overflow-hidden" : "opacity-100 h-auto"
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-4 flex items-center justify-center">
        <FaGift className="mr-2" />
        <span>
          USE CODE OFF10 TO GET FLAT 10% OFF ON ORDERS ABOVE RS.499 | FREE
          SHIPPING | COD AVAILABLE
        </span>
      </div>
    </div>
  );
};

export default PromoBanner;
