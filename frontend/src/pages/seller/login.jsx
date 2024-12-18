import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SellerNavbar from "../../components/admin/navbar";
import sellerSummaryApi from "../../common/seller";
import { toast } from "react-toastify";

const SellerSignIn = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    setLoading(true); // Set loading state to true during the request

    try {
      const response = await fetch(sellerSummaryApi.signIn.url, {
        method: sellerSummaryApi.signIn.method,
        credentials: "include", // Include credentials (cookies)
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), // Send form data directly
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to sign in");
      }

      const result = await response.json();
      console.log("Login successful:", result);

      // Handle result further, e.g., store user info or redirect
      if (result.succes) {
        toast.success("Login successful!");
        
        navigate("/seller");
        window.location.reload();
        // Refresh the page after successful login
      } else {
        toast.error(result.message || "An error occurred");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false); // Set loading state to false after the request finishes
    }
  };

  return (
    <>
      <SellerNavbar />
      <div className="flex items-center justify-center h-screen bg-pink-100 ">
        <div className="bg-pink-50 p-6 rounded-lg shadow-lg w-96">
          <h2 className="text-2xl font-bold text-center mb-6 text-pink-700">
            Seller Sign In
          </h2>

          {error && (
            <div className="bg-red-500 text-white p-2 mb-4 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 mb-4 border border-pink-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 mb-4 border border-pink-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full p-3 bg-pink-500 text-white rounded disabled:bg-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-600"
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default SellerSignIn;
