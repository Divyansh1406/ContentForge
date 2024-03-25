const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      "mongodb+srv://divyanshvashist01:PyFNKuj5Y725zpxG@contentforge.hbgsjs5.mongodb.net/contentforge?retryWrites=true&w=majority&appName=contentforge"
    );

    console.log(`Mongodb connected ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
