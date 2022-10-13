const joi = require("joi");
const Product = require("../../../models/product");

/**
 * @api GET /products/:productId
 * @description Get product details
 */
module.exports = async function (req, res) {
  try {
    const { productId } = req;

    const product = await Product.findOne({_id: productId});

    return res.json({data: product});

  } catch (error) {
    console.error("Error in getting product", error);
    return res
      .status(500)
      .json({ message: error.message ?? "Error in getting product" });
  }
};
