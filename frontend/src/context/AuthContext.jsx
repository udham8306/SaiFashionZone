import React, { createContext, useContext, useState, useEffect } from "react";
import summaryApi from "../common/user/index.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // // Axios instance with default configurations
  // const api = axios.create({
  //   baseURL: "https://ecommerse-assingment-backend.onrender.com", // Backend URL
  //   withCredentials: true, // Include cookies in requests
  // });

  // useEffect(() => {
  //   const userId = sessionStorage.getItem("userId");
  //   if (!userId) {
  //     setUser(null); // Clear user state if session expired
  //   }
  // }, []);

  // const signup = async (name, email, password) => {
  //   const response = await api.post("/auth/signup", { name, email, password });
  //   const { userId } = response.data;

  //   // Store userId in sessionStorage
  //   sessionStorage.setItem("userId", userId);

  //   setUser({ name, email, userId });
  //   return userId;
  // };

  // const login = async (email, password) => {
  //   try {
  //     const response = await api.post("/auth/login", { email, password });

  //     if (response.data.message === "Login successful") {
  //       const { userId } = response.data;

  //       // Save userId in sessionStorage
  //       sessionStorage.setItem("userId", userId);

  //       // Update the state with the logged-in user
  //       setUser({ email, userId });

  //       return "Login successful";
  //     } else {
  //       throw new Error("Login failed");
  //     }
  //   } catch (err) {
  //     if (err.response?.data?.error === "Account is suspended") {
  //       alert(
  //         "Your account is suspended from further notice due to unusual activity"
  //       );
  //     } else if (err.response?.data?.error === "Account is blocked") {
  //       alert("Your account has been terminated");
  //     }
  //     console.error("Login error:", err.response?.data?.error || err.message);
  //     throw err;
  //   }
  // };

  // const logout = async () => {
  //   await api.post("/auth/logout");
  //   setUser(null);
  // };

  const logout = async () => {
    try {
      // Send logout request to the backend
      const response = await fetch(summaryApi.userlogout.url, {
        method: summaryApi.userlogout.method,
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
        setUser(null);

        // Optional: Redirect to login page or home
        window.location.href = "/login"; // Or use navigate("/login") if you're using React Router
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
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const dataResponse = await fetch(summaryApi.userDetails.url, {
        method: summaryApi.userDetails.method,
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
      console.log("User Data:", dataApi.data);

      setUser(dataApi.data);
    } catch (err) {
      console.error("Error fetching user:", err.message);
      // Optional: Show error message to the user
    }
  };

  return (
    <AuthContext.Provider value={{ user, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { useAuth };
