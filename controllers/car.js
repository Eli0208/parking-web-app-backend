const bcrypt = require("bcrypt");
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

const login = async (req, res) => {
  const { ownersEmail, password } = req.body;
  const car = await Car.findOne({ ownersEmail });
  if (car == null) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  try {
    if (bcrypt.compare(password, car.password)) {
      const accessToken = jwt.sign(
        { ownersEmail: car.ownersEmail, isAdmin: car.isAdmin },
        process.env.ACCESS_TOKEN_SECRET
      );
      res.json({ accessToken });
    } else {
      res.status(400).json({ message: "Invalid email or password" });
    }
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
