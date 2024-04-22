// logController.js

const Car = require("../models/car.js");

// Controller function to log time in
const logTimeIn = async (req, res) => {
  const { rfid } = req.body;

  try {
    // Find the car entry based on RFID
    const car = await Car.findOne({ rfid });

    if (!car) {
      return res.status(404).send("Vehicle not registered/Invalid tag");
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

    res.send(car.ownerName);
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

    res.send(car.ownerName);
  } catch (error) {
    console.error("Error logging time out:", error);
    res.status(500).send("Internal Server Error");
  }
};

const getAllLogs = async (req, res) => {
  try {
    // Find all logs in the database
    const logs = await Car.find();

    res.json(logs); // Send the logs as JSON response
  } catch (error) {
    console.error("Error fetching logs:", error);
    res.status(500).json({ message: "Internal Server Error" }); // Handle error scenarios
  }
};

const getAllLogsByDate = async (req, res) => {
  try {
    const { startDate, endDate } = req.params;

    const parsedStartDate = new Date(startDate);
    const parsedEndDate = new Date(endDate);

    // Set the time to the beginning of the start date
    parsedStartDate.setHours(0, 0, 0, 0);

    // Set the time to the end of the end date
    parsedEndDate.setHours(23, 59, 59, 999);

    // Find logs within the date range
    const logs = await Car.find({
      $or: [
        { "timeIn.date": { $gte: parsedStartDate, $lte: parsedEndDate } },
        { "timeOut.date": { $gte: parsedStartDate, $lte: parsedEndDate } },
      ],
    });

    res.json(logs);
  } catch (error) {
    console.error("Error fetching logs by date range:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { logTimeIn, logTimeOut, getAllLogs, getAllLogsByDate };
