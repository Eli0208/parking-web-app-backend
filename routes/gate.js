//file path: routes/gate.js
const express = require("express");
const router = express.Router();

const { freeGate, useGate, checkGate, newGate } = require("../controllers/gate");

router.get("/useGate", useGate);

router.get("/freeGate", freeGate);

router.get("/checkGate", checkGate);

router.post('/post', newGate);

module.exports = router;