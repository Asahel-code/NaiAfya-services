const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const policeSchema = new Schema(
    {
        name: { type: String, required: true },
        contactNumber: { type: String, required: true, unique: true },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Police', policeSchema); 