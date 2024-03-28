const bcrypt = require("bcrypt");
const Car = require("../models/car.js");

const registerCar = async (req, res) => {
  const {
    rfid,
    ownerName,
    ownersEmail,
    plateNo,
    brand,
    model,
    color,
    password,
  } = req.body;

  try {
    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);
    const newCar = new Car({
      rfid,
      ownerName,
      ownersEmail,
      plateNo,
      brand,
      model,
      color,
      password: hashedPassword,
    });

    const savedCar = await newCar.save();

    console.log("New car registered:", savedCar);
    res.send("Car registered successfully!");
  } catch (error) {
    console.error("Error registering car:", error);
    res.status(500).send("Internal Server Error");
  }
};

const getCars = async (req, res) => {
  try {
    // Fetch all cars from the database
    const cars = await Car.find();
    res.json(cars);
  } catch (error) {
    console.error("Error fetching cars:", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = { registerCar, getCars };
