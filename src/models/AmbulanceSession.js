const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ambulanceSessionSchema = new Schema(
    {
        ambulance: { type: Schema.Types.ObjectId, ref: 'Ambulance', require: true },
        status: { type: String, require: true },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('AmbulanceSession', ambulanceSessionSchema); 