const express = require("express");
const cors = require("cors");
const carRoute = require("./routes/car.js");
const logRoute = require("./routes/log.js");
const mongoose = require("mongoose");

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB Atlas
mongoose
  .connect(
    "mongodb+srv://carparkdhvsu:A7nF4whKryAHFKZh@cluster0.rrdyjcw.mongodb.net/",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to MongoDB Atlas");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

// Routes
app.use("/cars", carRoute);
app.use("/logs", logRoute); // Use log routes

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
