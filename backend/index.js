const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");
const router = require("./routes/userRoute/index");
const sellerRouter = require("./routes/sellerRoute");

const app = express();

// Middleware to parse JSON and cookies
app.use(express.json()); // Parses incoming JSON requests
app.use(cookieParser()); // Parses cookies

// Middleware to handle CORS
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["POST", "GET", "PUT"],
    credentials: true, // Allow cookies to be sent with cross-origin requests
  })
);

// Default route to handle requests to root ("/")
app.get("/", (req, res) => {
  res.send("Welcome to the Backend API!"); // Or any message you want
});

// Route setup
app.use("api/user", router); // User routes
app.use("api", sellerRouter); // Seller routes


// Error handling middleware for server errors
app.use((err, req, res, next) => {
  console.error(err); // Log error
  res.status(500).json({ message: "Server Error" }); // Send response for server errors
});

// Port Configuration
const PORT = process.env.PORT || 8050;

// Connect to the database and start the server
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log("Connected to MongoDB");
      console.log("Listening on port", PORT);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB:", error.message);
    process.exit(1); // Exit process on failure
  });

// Export the express app for Vercel serverless function
module.exports = app;
