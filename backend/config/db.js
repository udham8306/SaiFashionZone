const mongoose = require("mongoose");

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000, // Increase the server selection timeout
  socketTimeoutMS: 45000, // Increase socket timeout
  poolSize: 10, // Set a higher pool size
  } catch (error) {
    // console.log("Failed to connect to MongoDB:", error.message);
  }
}

module.exports = connectDB;
