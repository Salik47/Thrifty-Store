const Product = require("../models/productModel");

// @ROUTE  POST /api/v1/product/new
// @DESC   Create a new product
// @ACCESS Public                   //TODO: Change to private

const createProduct = async (req, res) => {
  const createdProduct = await Product.create(req.body);
  res.status(201).json({
    success: true,
    data: {
      message: "Product created successfully",
      createdProduct,
    },
  });
};

// @ROUTE  GET /api/v1/products
// @DESC   Get all products
// @ACCESS Public

const getAllProducts = async (_req, res) => {
  const foundProducts = await Product.find();
  res.status(200).json({
    success: true,
    data: foundProducts,
  });
};

const getProductByID = async (req, res) => {
  const productID = req.params.productID;
  const foundProduct = await Product.findById(productID);

  if (!foundProduct) {
    return res.status(404).json({
      success: false,
      data: {
        message: `Product ${productID} not found`,
      },
    });
  }

  res.status(200).json({
    success: true,
    data: foundProduct,
  });
};

// @ROUTE  PUT /api/v1/product/:productID
// @DESC   Update a product
// @ACCESS Public                   //TODO: Change to private

//TODO - remove try catch and implement custom async-handler
const updateProductByID = async (req, res) => {
  try {
    const productID = req.params.productID;
    const foundProduct = await Product.findById(productID);
    if (!foundProduct) {
      return res.status(404).json({
        success: false,
        data: {
          message: `Product ${productID} not found`,
        },
      });
    }

    // const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true, useFindAndModify: false } }); //* Alternate way to update the product
    const updatedProduct = new Product(req.body);
    updatedProduct._id = productID;
    updatedProduct.save();

    res.status(200).json({
      success: true,
      data: [
        {
          message: `Product ${productID} updated successfully`,
          updatedProduct,
        },
      ],
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      data: {
        message: err.message,
      },
    });
  }
};

// @ROUTE  DELETE /api/v1/product/:productID
// @DESC   Delete a product
// @ACCESS Public                   //TODO: Change to private

const deleteProductByID = async (req, res) => {
  const productID = req.params.productID;
  const foundProduct = await Product.findById(productID);

  if (!foundProduct) {
    return res.status(404).json({
      success: false,
      data: {
        message: `Product ${productID} not found`,
      },
    });
  }

  // const deletedProduct = await Product.findByIdAndDelete(productID); //* Alternate way to delete a product from db
  const deletedProduct = await foundProduct.remove();

  res.status(200).json({
    success: true,
    data: {
      message: `Product ${productID} deleted successfully`,
      deletedProduct,
    },
  });
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductByID,
  updateProductByID,
  deleteProductByID,
};
