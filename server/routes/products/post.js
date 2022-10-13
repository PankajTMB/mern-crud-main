const joi = require("joi");
const Product = require("../../models/product");

const bodySchema = joi.object().keys({
  name: joi.string().required(),
  price: joi.number().min(1).required(),
  quantity: joi.number().min(1).required(),
});

/**
 * @api POST /api/products
 * @description Create new product
 */
module.exports = async function (req, res) {
  try {
    const { body } = req;

    const { name, quantity, price } = await bodySchema.validateAsync(body, { stripUnknown: true });
    

    const product = await new Product({
      name, quantity, price
    }).save();

    return res.json({data: product, message: 'Product saved successfully'});

  } catch (error) {
    console.error("Error in creating product", error);
    return res
      .status(500)
      .json({ message: error.message ?? "Error in creating product" });
  }
};
