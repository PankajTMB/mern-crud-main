const joi = require("joi");
const Product = require("../../models/product");

/**
 * @api GET /api/products
 * @description Get all products
 */
module.exports = async function (req, res) {

  try {
    if(req.query.limit === "undefined")  req.query.limit = 0;
    let products = await Product.find().limit(req.query.limit).sort({ [req.query.sort] :  req.query.order=== "assinding"? 1 : -1  });

    return res.json({ products });
  } catch (error) {
    console.error("Error in getting products", error);
    return res
      .status(500)
      .json({ message: error.message ?? "Error in getting products" });
  }
};
