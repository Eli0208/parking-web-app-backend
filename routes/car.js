// carRoute.js

const express = require("express");
const router = express.Router();
const { registerCar, getCars } = require("../controllers/car");

// POST endpoint to handle form submission
router.post("/register-car", registerCar);
router.get("/", getCars);

module.exports = router;
