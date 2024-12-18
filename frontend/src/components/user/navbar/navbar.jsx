import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaSearch,
  FaTimes,
  FaBars,
  FaUser,
  FaHeart,
  FaShoppingCart,
  FaGift,
  FaHome,
  FaStore,
  FaEnvelope,
} from "react-icons/fa";
import SaiFashionZone12 from "../../Images/SaiFashionZone12.png"; // Corrected image import
import SearchBar from "./SearchBar";
import summaryApi from "../../../common/user";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const ProfessionalNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const [cartItemCount, setCartItemCount] = useState(0);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleProfileMenu = () => setIsProfileMenuOpen(!isProfileMenuOpen);
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);
  const isActive = (path) => location.pathname === path;
  const searchRef = useRef();
  const profileMenuRef = useRef();  // Ref for the profile menu container
  const profileButtonRef = useRef(); // Ref for the profile button
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  useEffect(() => {
    const fetchCartItems = async () => {
      var total = 0;
      const userId = sessionStorage.getItem("userId");
      if (!userId) return;
      const cartResponse = await fetch(
        `https://ecommerse-assingment-backend.onrender.com/cart/${userId}`
      );
      const cartData = await cartResponse.json();
      cartData.cart?.forEach((item) => {
        total = total + item.productQty;
      });
      setCartItemCount(total);
    };
    fetchCartItems();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close the profile menu if clicked outside the profile button or menu
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target) &&
        !profileButtonRef.current.contains(event.target)
      ) {
        setIsProfileMenuOpen(false);
      }
    };

    // Listen for click events outside the profile menu
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMenuOpen(false);
        setIsSearchOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    setUserName(user?.name);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/Login");
  };

  const userId = user?._id;

  return (
    <nav
      className={`top-0 left-0 w-full z-50 transition-all duration-300 mb-auto ${
        scrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      {/* Main Navigation */}
      <div className="bg-white border-b">
        <div className="max-w-[1200px] mx-auto px-4 lg:px-0">
          <div className="h-[70px] flex items-center justify-between">
            {/* Logo Text with margin and hover effect */}
            <Link
              to="/HomePage"
              className="text-pink-500 hover:text-pink-600 transition-all duration-300 flex flex-col items-center mr-8"
            >
              <span className="text-2xl font-bold">SaiFashionZone</span>
              <span className="text-sm text-gray-600 ">by Raiba</span>
            </Link>
            {/* Desktop Navigation Menu */}
            <div className="hidden lg:flex flex-grow justify-start space-x-8 text-sm font-medium">
              {[
                { path: "/HomePage", name: "HOME" },
                { path: "/shop", name: "SHOP" },
                { path: "/OccasionsPage", name: "OCCASIONS" },
                { path: "/contact", name: "CONTACT" },
                { path: "/about", name: "ABOUT" },
              ].map(({ path, name }) => (
                <Link
                  key={path}
                  to={path}
                  className={`relative group transition-colors ${
                    isActive(path) ? "text-pink-600" : "text-gray-800"
                  } hover:text-pink-600`}
                >
                  {name}
                  <span
                    className={`absolute bottom-[-4px] left-0 w-0 h-0.5 bg-pink-600 transition-all duration-300 group-hover:w-full ${
                      isActive(path) ? "w-full" : ""
                    }`}
                  />
                </Link>
              ))}
            </div>

            {/* Action Icons (Profile and Wishlist on the right) */}
            <div className="flex items-center space-x-6 justify-end">
              <button className="text-gray-800 hover:text-pink-600 transition">
                {isSearchOpen ? (
                  <div ref={searchRef}>
                    <SearchBar />
                  </div>
                ) : (
                  <FaSearch className="w-5 h-5" onClick={toggleSearch} />
                )}
              </button>

              <Link
                to="/cart"
                className="relative text-gray-800 hover:text-pink-600 transition flex items-center"
              >
                <FaShoppingCart className="w-5 h-5" />
                <span className="ml-2 hidden md:block">Cart</span>
                {cartItemCount ? (
                  <span className="absolute top-[-8px] right-[-8px] bg-pink-600 text-white rounded-full text-xs w-4 h-4 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                ) : null}
              </Link>

              <button className="text-gray-800 hover:text-pink-600 transition hidden md:block">
                <FaHeart className="w-5 h-5" />
              </button>

              <div className="relative">
                <button
                  ref={profileButtonRef}
                  onClick={toggleProfileMenu}
                  className="flex items-center text-gray-800 hover:text-pink-600 transition"
                >
                  <FaUser className="w-5 h-5" />
                  <span className="ml-2 hidden md:block">
                    {user?._id ? `Hi, ${user?.name}` : "Profile"}
                  </span>
                </button>

                {isProfileMenuOpen && (
                  <div
                    ref={profileMenuRef}
                    className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg overflow-hidden z-50 "
                  >
                    {userId ? (
                      <>
                        <Link
                          to="/MyAccount"
                          className="block px-4 py-2 hover:bg-pink-50 transition"
                        >
                          My Account
                        </Link>
                        <Link
                          to="/MyOrders"
                          className="block px-4 py-2 hover:bg-pink-50 transition"
                        >
                          My Orders
                        </Link>
                        <Link
                          to="/seller/homepage"
                          className="block px-4 py-2 hover:bg-pink-50 transition"
                        >
                          Become a Seller
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-2 hover:bg-pink-50 transition"
                        >
                          Logout
                        </button>
                      </>
                    ) : (
                      <>
                        <Link
                          to="/login"
                          className="block px-4 py-2 hover:bg-pink-50 transition"
                        >
                          Login
                        </Link>
                        <Link
                          to="/Signup"
                          className="block px-4 py-2 hover:bg-pink-50 transition"
                        >
                          Sign Up
                        </Link>
                        <Link
                          to="/seller/homepage"
                          className="block px-4 py-2 hover:bg-pink-50 transition"
                        >
                          Become a Seller
                        </Link>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t">
          <div className="flex flex-col items-center space-y-4 py-4">
            {[
              { path: "/HomePage", name: "HOME" },
              { path: "/shop", name: "SHOP" },
              { path: "/OccasionsPage", name: "OCCASIONS" },
              { path: "/contact", name: "CONTACT" },
              { path: "/about", name: "ABOUT" },
            ].map(({ path, name }) => (
              <Link
                key={path}
                to={path}
                className={`text-gray-800 hover:text-pink-600 w-full text-center`}
              >
                {name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default ProfessionalNavbar;
