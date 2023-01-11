const express = require("express");

// Import all routes
const products = require("./routes/productRoutes");

require("dotenv").config({ path: "backend/config/config.env" });

const app = express();

// Middleware
app.use(express.json());
if (process.env.NODE_ENV === "DEVELOPMENT") {
  const morgan = require("morgan");
  app.use(morgan("dev"));
}

// Mount routers
app.use("/api/v1", products);

module.exports = app;
