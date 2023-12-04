const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const fighterSchema = new Schema(
    {
        name: { type: String, required: true },
        contactNumber: { type: String, required: true, unique: true },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Fighter', fighterSchema); 