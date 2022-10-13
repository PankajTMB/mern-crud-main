const express = require("express");
const extractParams = require("../../middlewares/extractParams");
const router = express.Router();

const get = require("./get");
const post = require("./post");

const productId = require('./productId');

router.post("/", post);
router.get("/", get);

router.use('/:productId', extractParams, productId);

module.exports = router;
