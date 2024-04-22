//file path: routes/gate.js
const express = require("express");
const router = express.Router();

const {
  freeGate,
  useGate,
  checkGate,
  newGate,
} = require("../controllers/gate");

router.get("/usegate", useGate);

router.get("/freegate", freeGate);

router.get("/checkgate", checkGate);

router.post("/post", newGate);

module.exports = router;
