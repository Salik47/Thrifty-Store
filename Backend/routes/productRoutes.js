const express = require("express");
const router = express.Router();
const {
  createProduct,
  getAllProducts,
  getProductByID,
  updateProductByID,
  deleteProductByID,
} = require("../controllers/productController");

router.route("/product/new").post(createProduct);
router.route("/products").get(getAllProducts);
router
  .route("/product/:productID")
  .get(getProductByID)
  .put(updateProductByID)
  .delete(deleteProductByID);

module.exports = router;
