const joi = require("joi");
const Product = require("../../../models/product");

const bodySchema = joi.object().keys({
  name: joi.string().required(),
  price: joi.number().min(1).required(),
  quantity: joi.number().min(1).required(),
});

/**
 * @api POST /api/products/:productId
 * @description Update a product
 */
module.exports = async function (req, res) {
  try {
    const { body, productId } = req;

    const { name, quantity, price } =
      await bodySchema.validateAsync(body, { stripUnknown: true });

    const product = await Product.findOneAndUpdate({_id: productId}, {
      name, quantity, price
    }, {new: true});

    return res.json({data: product, message: 'Product updating successfully'});

  } catch (error) {
    console.error("Error in updating product", error);
    return res
      .status(500)
      .json({ message: error.message ?? "Error in updating product" });
  }
};
