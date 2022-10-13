const express = require("express");
const router = express.Router();

const get = require("./get");
const put = require("./put");
const remove = require("./remove");

router.get("/", get);
router.put("/", put);
router.delete("/", remove);

module.exports = router;
