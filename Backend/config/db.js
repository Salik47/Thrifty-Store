const mongoose = require("mongoose");
require("dotenv").config({ path: "backend/config/config.env" });

const MONGO_CONNECTION_STRING = process.env.MONGO_URI;
const MONGOOSE_OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.set("strictQuery", true);

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      MONGO_CONNECTION_STRING,
      MONGOOSE_OPTIONS
    );
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

module.exports = connectDB;
