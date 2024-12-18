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
    methods : ["POST","GET","PUT"],
    credentials: true, // Allow cookies to be sent with cross-origin requests
  })
);

// Route setup
app.use("/api", router);
app.use("/api", sellerRouter);


// Error handling middleware for unhandled routes
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

// Error handling middleware for server errors
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Server Error" });
});

const PORT = process.env.PORT || 8050;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log("Connected to MongoDB");
      console.log("Listening on port", PORT);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB:", error.message);
    process.exit(1); // Exit the process with failure code
  });

module.exports = app;
