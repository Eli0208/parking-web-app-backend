//file path: controllers/gate.js

const Gate = require("../models/gate.js");

const useGate = async (req, res) => {
  console.log("usegate was called");
  try {
    const motorStatus = await Gate.find({ name: "gate operation" });
    let status_string = JSON.stringify(motorStatus);

    status_string = JSON.parse(status_string);

    const occupied = status_string[0].occupied;

    if (occupied) {
      res.send("occupied");
    } else {
      const opt = { new: true };
      const occupiedData = { occupied: true };
      const newData = await Gate.findOneAndUpdate(
        { name: "gate operation" },
        occupiedData,
        opt
      );
      console.log("motor status = occupied");
      res.send("occupying the motor...");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const freeGate = async (req, res) => {
  //console.log("test");
  try {
    const motorStatus = await Gate.find({ name: "gate operation" });
    let status_string = JSON.stringify(motorStatus);
    status_string = JSON.parse(status_string);

    const occupied_status = status_string[0].occupied;

    if (occupied_status) {
      const opt = { new: true };
      const occupiedData = { occupied: false };
      const newData = await Gate.findOneAndUpdate(
        { name: "gate operation" },
        occupiedData,
        opt
      );
      console.log("motor status = unoccupied");
      res.send("unoccupying the motor...");
    } else {
      res.send("notOccupied");
    }
  } catch (error) {
    res.status(400).send("Cannot perform the operation");
  }
};

const checkGate = async (req, res) => {
  //console.log("test");
  try {
    const motorStatus = await Gate.find({ name: "gate operation" });
    let status_string = JSON.stringify(motorStatus);
    status_string = JSON.parse(status_string);

    const occupied_status = status_string[0].occupied;

    if (occupied_status) {
      res.send("occupied");
    } else {
      res.send("notOccupied");
    }
  } catch (error) {
    res.status(400).send("Cannot perform the operation");
  }
};

const newGate = async (req, res) => {
  //Tests for gate document entry in database. Can be removed anytime
  const data = new Gate({
    name: req.body.name,
    occupied: req.body.occupied,
  });

  try {
    const saveThis = await data.save();
    res.send("Documents entry has been successful");
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
module.exports = { useGate, freeGate, checkGate, newGate };
