import React, { createContext, useContext, useState, useEffect } from "react";
import sellerSummaryApi from "../common/seller/index.js";
import { useNavigate } from "react-router-dom";

const SellerAuthContext = createContext();

export const SellerAuthProvider = ({ children }) => {
  const [sellerData, setSeller] = useState(null);

  const logout = async () => {
    try {
      // Send logout request to the backend
      const response = await fetch(sellerSummaryApi.sellerlogout.url, {
        method: sellerSummaryApi.sellerlogout.method,
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Include credentials (cookies) for authentication
      });

      // Parse the response
      const responseData = await response.json();

      // If the logout is successful, clear the user state and cookies
      if (responseData.success) {
        // Clear cookies (if any)
        document.cookie =
          "userId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

        // Optionally clear any other relevant cookies
        // document.cookie = "otherCookie=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

        // Clear user state
        setSeller(null);

        // Optional: Redirect to login page or home
        window.location.href = "/seller/signin"; // Or use navigate("/login") if you're using React Router
      } else {
        // Handle failure if needed (e.g., show an error message)
        console.error(
          "Logout failed: ",
          responseData.message || "Unknown error"
        );
      }
    } catch (err) {
      // Log the error to console for debugging purposes
      console.error("Error during logout: ", err.message);
      // Optionally show an alert or error message to the user
    }
  };

  useEffect(() => {
    fetchSeller();
  }, []);

  const fetchSeller = async () => {
    try {
      const dataResponse = await fetch(sellerSummaryApi.sellerDetails.url, {
        method: sellerSummaryApi.sellerDetails.method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!dataResponse.ok) {
        const errorData = await dataResponse.json();
        throw new Error(errorData.message || "Failed to fetch user details");
      }

      const dataApi = await dataResponse.json();
      console.log("Seller Data:", dataApi.data);

      setSeller(dataApi.data);
    } catch (err) {
      console.error("Error fetching Seller:", err.message);
      // Optional: Show error message to the user
    }
  };

  return (
    <SellerAuthContext.Provider value={{ sellerData, logout }}>
      {children}
    </SellerAuthContext.Provider>
  );
};

const useSellerAuth = () => useContext(SellerAuthContext);

export { useSellerAuth };
