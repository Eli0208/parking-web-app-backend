// carRoute.js

const express = require("express");
const router = express.Router();
const {
  registerCar,
  getCars,
  login,
  getCarByEmail,
} = require("../controllers/car");

// POST endpoint to handle form submission
router.post("/register-car", registerCar);
router.get("/", getCars);
router.post("/login", login);
router.get("/email/:ownersEmail", getCarByEmail);

module.exports = router;
