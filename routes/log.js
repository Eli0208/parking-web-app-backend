// logRoute.js

const express = require("express");
const router = express.Router();
const { logTimeIn, logTimeOut } = require("../controllers/log.js");

// Route to log time in
router.post("/time-in", logTimeIn);

// Route to log time out
router.post("/time-out", logTimeOut);

module.exports = router;
