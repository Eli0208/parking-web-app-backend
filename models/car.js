const mongoose = require("mongoose");

const timeSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  time: {
    type: String,
    required: true,
  },
});

const carSchema = new mongoose.Schema({
  rfid: {
    type: String,
    required: true,
  },
  ownerName: {
    type: String,
    required: true,
  },
  ownersEmail: {
    type: String,
    required: true,
  },
  plateNo: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false, // Default value for isAdmin is false
  },
  loginStatus: {
    type: Boolean,
    default: false,
  },
  timeIn: [timeSchema],
  timeOut: [timeSchema],
  department: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
    enum: ["Teaching", "Non-Teaching", "Admin"], // Restricting to specific values
  },
});

// Create the Car model
const Car = mongoose.model("Car", carSchema);

module.exports = Car;
