//file path: models/gate.js

const mongoose = require("mongoose");

const motorSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    occupied: {
        requred: true,
        type: Boolean,
        default: false
    }

});

const Gate = mongoose.model("Gate", motorSchema);

module.exports = Gate;