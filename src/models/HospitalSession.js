const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const hospitalSessionSchema = new Schema(
    {
        hospital: { type: Schema.Types.ObjectId, ref: 'Hospital', require: true },
        status: { type: String, require: true },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('HospitalSession', hospitalSessionSchema); 