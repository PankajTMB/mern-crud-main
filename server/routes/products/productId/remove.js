const joi = require("joi");
const Product = require("../../../models/product");

/**
 * @api DELETE /api/products/:productId
 * @description Delete a product
 */
module.exports = async function (req, res) {
  try {
    const { productId } = req;

    const result = await Product.deleteOne({ _id: productId });

    return res.json({
      message: result.deletedCount
        ? "Product deleted successfully"
        : "Product does not exist",
    });
  } catch (error) {
    console.error("Error in deleted product", error);
    return res
      .status(500)
      .json({ message: error.message ?? "Error in deleted product" });
  }
};
