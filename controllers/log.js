// logController.js

const Car = require("../models/car.js");

// Controller function to log time in
const logTimeIn = async (req, res) => {
  console.log("test");
  const { rfid } = req.body;

  try {
    // Find the car entry based on RFID
    const car = await Car.findOne({ rfid });

    if (!car) {
      return res.status(404).send("No car found for the given RFID");
    }

    if (car.loginStatus) {
      return res.status(403).send("Car is already logged in");
    }

    // Log time in
    car.timeIn.push({
      date: new Date(),
      time: new Date().toLocaleTimeString(),
    });
    car.loginStatus = true;
    await car.save();

    res.json(car);
  } catch (error) {
    console.error("Error logging time in:", error);
    res.status(500).send("Internal Server Error");
  }
};

// Controller function to log time out
const logTimeOut = async (req, res) => {
  const { rfid } = req.body;

  try {
    // Find the car entry based on RFID
    const car = await Car.findOne({ rfid });

    if (!car) {
      return res.status(404).send("No car found for the given RFID");
    }

    if (!car.loginStatus) {
      return res.status(403).send("Car is already logged out");
    }

    // Log time out
    car.timeOut.push({
      date: new Date(),
      time: new Date().toLocaleTimeString(),
    });
    car.loginStatus = false;
    await car.save();

    res.json(car);
  } catch (error) {
    console.error("Error logging time out:", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = { logTimeIn, logTimeOut };
