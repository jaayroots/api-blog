const express = require('express')
const router = express.Router()

module.exports = router

router.use("/menu", require("./menu"));
router.use("/content", require("./content"));
router.use("/news", require("./news"));
router.use("/place", require("./place"));
router.use("/souvenir", require("./souvenir"));
router.use("/home", require("./home"));
