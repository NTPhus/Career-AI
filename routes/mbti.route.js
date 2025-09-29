const express = require("express");
const router = express.Router();

const controller = require("../controllers/mbti.controller");

router.get("/", controller.index);

module.exports = router;