const jwt = require("jsonwebtoken");
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
    department, // New field
    position, // New field
  } = req.body;

  try {
    const newCar = new Car({
      rfid,
      ownerName,
      ownersEmail,
      plateNo,
      brand,
      model,
      color,
      password,
      department, // Include the new field
      position, // Include the new field
    });
    console.log("test");
    await newCar.save();

    res.send("Car registered successfully!");
  } catch (error) {
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

const login = async (req, res) => {
  const { ownersEmail, password } = req.body;
  try {
    const car = await Car.findOne({ ownersEmail });
    if (!car) {
      return res.status(400).json({ message: "Invalid email" });
    }
    console.log(car);
    const isPasswordValid = password === car.password; // Directly compare passwords
    if (!isPasswordValid) {
      // Password does not match
      return res.status(400).json({ message: "Invalid password" });
    }

    // Password matches, generate and send access token
    const accessToken = jwt.sign(
      { ownersEmail: car.ownersEmail, isAdmin: car.isAdmin },
      process.env.ACCESS_TOKEN_SECRET
    );
    res.json({ accessToken });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getCarByEmail = async (req, res) => {
  const { ownersEmail } = req.params; // Get the owner's email from the request parameters

  try {
    // Find the car entry using the owner's email
    const car = await Car.findOne({ ownersEmail });

    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }

    // If the car is found, return it in the response
    res.json(car);
  } catch (error) {
    console.error("Error fetching car by email:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { registerCar, getCars, login, getCarByEmail };
