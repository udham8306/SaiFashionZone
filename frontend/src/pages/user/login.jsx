import React, { useState } from "react";
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';
import { FaGoogle, FaFacebook, FaTwitter } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import Navbar from "../../components/user/navbar/navbar";
import { motion } from 'framer-motion';
import { Helmet } from "react-helmet";
import summaryApi from "../../common/user/index.js";
import { toast } from "react-toastify";
const Login = () => {
  const { login } = useAuth();
  const [emailOrMobile, setEmailOrMobile] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(summaryApi.signIn.url, {
        method: summaryApi.signIn.method,
        credentials : "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email : emailOrMobile,
          password,
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to sign in");
      }
  
      const result = await response.json();
      console.log("Login successful:", result);
  
      if (result.success) {
        toast.success(result.message);
        // Redirect to HomePage (or any other route)
        window.location.href = '/homepage';
      } else {
        toast.error(result.message);
      }
  
    } catch (err) {
      console.error("Login error:", err);
      setError(err.message || "Something went wrong. Please try again.");
    }
  };
  


  return (
    <>
      <Helmet>
        <title>Login | SaiFashionZone</title>
      </Helmet>
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-pink-100 flex items-center justify-center p-4">
      
        <motion.div 
          className="w-full max-w-md bg-white shadow-2xl rounded-2xl overflow-hidden"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ 
            duration: 0.5,
            type: "spring",
            stiffness: 120
          }}
        >
          <div className="p-8">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">
                Welcome Back
              </h2>
              <p className="text-pink-600 mt-2">
                Log in to SaiFashionZone
              </p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6 text-center">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email/Mobile Input */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="text-pink-400" />
                </div>
                <input
                  type="text"
                  placeholder="Email or Mobile Number"
                  required
                  className="w-full pl-10 pr-4 py-3 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-300"
                  value={emailOrMobile}
                  onChange={(e) => setEmailOrMobile(e.target.value)}
                />
              </div>

              {/* Password Input */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="text-pink-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  required
                  className="w-full pl-10 pr-12 py-3 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-300"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-pink-400 hover:text-pink-600 transition"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                className="w-full bg-pink-500 text-white py-3 rounded-lg font-semibold hover:bg-pink-600 transition duration-300 transform active:scale-95"
                whileTap={{ scale: 0.95 }}
              >
                Log In
              </motion.button>
            </form>
            <div className="mt-6 text-center">
              <p className="text-gray-600 text-sm">
                Don't have an account? 
                <a href="/signup" className="text-pink-600 hover:text-pink-800 ml-2 font-semibold">
                  Sign Up
                </a>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Login;