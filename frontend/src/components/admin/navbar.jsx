import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useSellerAuth } from "../../context/SellerAuthContext";

const SellerNavbar = () => {
  const { sellerData, logout } = useSellerAuth();
  const [isMenuVisible, setMenuVisible] = useState(false);
  const menuRef = useRef(null);

  const handleLogout = () => {
    logout();
  };

  const handleProfileClick = () => {
    setMenuVisible((prev) => !prev);
  };

  // Close the menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="bg-pink-600  text-white">
      <div className="flex items-center justify-between">
        {/* Left side: Branding */}
        <div className="text-xl sm:text-2xl font-bold pb-2">
          <Link
            to="/HomePage"
            className="text-white transition-all duration-300 flex flex-col items-center mt-2 ml-6 "
          >
            <span className="text-lg font-bold">SaiFashionZone</span>
            <span className="text-sm text-gray-600">by Raiba</span>
          </Link>
        </div>

        {/* Center: Links */}
        <div className="hidden sm:flex items-center space-x-4 ml-5 ">
          <Link to="/seller/homepage" className="hover:text-pink-300 text-sm sm:text-base">
            Home
          </Link>
          <Link to="/seller/fees-and-commission" className="hover:text-pink-300 text-sm sm:text-base">
            Fees and Commission
          </Link>
          <Link to="/seller/grow" className="hover:text-pink-300 text-sm sm:text-base">
            Grow
          </Link>
          <Link to="/seller/learn" className="hover:text-pink-300 text-sm sm:text-base">
            Learn
          </Link>
          <Link to="/seller/shopsy" className="hover:text-pink-300 text-sm sm:text-base">
            Shopsy
          </Link>
        </div>

        {/* Right side: Profile and Dashboard */}
        <div className="ml-auto flex items-center space-x-4 sm:space-x-6 mr-6 sm:mr-12">
          {sellerData ? (
            <div className="flex items-center space-x-6 relative">
              <Link
                to="/seller"
                className="bg-pink-500 text-white px-4 py-1 sm:px-4 sm:py-2 rounded-full hover:bg-pink-700 text-xs sm:text-base"
              >
                Dashboard
              </Link>

              {/* Profile Icon and Menu */}
              <div className="relative" ref={menuRef}>
                <button className="flex items-center space-x-2 focus:outline-none" onClick={handleProfileClick}>
                  <img
                    src={sellerData.profilePic || "https://via.placeholder.com/40"}
                    alt="Profile"
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="text-xs sm:text-sm">{sellerData.name || "Profile"}</span>
                </button>

                {/* Expandable Profile Menu */}
                {isMenuVisible && (
                  <div className="absolute right-0 mt-2 w-32 bg-pink-100 text-black rounded shadow-lg z-10">
                    <Link
                      to="/seller/profile"
                      className="block px-4 py-2 text-sm sm:text-base hover:bg-pink-200"
                    >
                      Your Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm sm:text-base hover:bg-pink-200"
                    >
                      Log Out
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <>
              <Link
                to="/seller/signup"
                className="bg-pink-500 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-base"
              >
                Sign Up
              </Link>
              <Link
                to="/seller/signin"
                className="bg-pink-500 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-base"
              >
                Log In
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="sm:hidden flex items-center">
          <button
            onClick={() => setMenuVisible(!isMenuVisible)}
            className="text-white"
          >
            <i className="fas fa-bars text-2xl"></i>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuVisible && (
        <div className="sm:hidden bg-pink-600 text-white text-center space-y-4 p-4">
          <Link to="/seller/homepage" className="block">
            Sell Online
          </Link>
          <Link to="/seller/fees-and-commission" className="block">
            Fees and Commission
          </Link>
          <Link to="/seller/grow" className="block">
            Grow
          </Link>
          <Link to="/seller/learn" className="block">
            Learn
          </Link>
          <Link to="/seller/shopsy" className="block">
            Shopsy
          </Link>
          {sellerData ? (
            <div className="flex flex-col items-center mt-4">
              <Link to="/seller" className="block py-2">
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="block py-2 mt-2 text-red-600"
              >
                Log Out
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center mt-4">
              <Link to="/seller/signup" className="block py-2">
                Sign Up
              </Link>
              <Link to="/seller/signin" className="block py-2">
                Log In
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SellerNavbar;
