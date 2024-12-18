const mongoose = require("mongoose");

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
      serverSelectionTimeoutMS: 30000,
    });

    // console.log("Connected to MongoDB");
  } catch (error) {
    // console.log("Failed to connect to MongoDB:", error.message);
  }
}

module.exports = connectDB;
