const mongoose = require("mongoose");
const productSchema = require("./schema");

module.exports = mongoose.model("products", productSchema);
