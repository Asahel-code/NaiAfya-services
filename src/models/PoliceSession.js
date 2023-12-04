const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const policeSessionSchema = new Schema(
    {
        police: { type: Schema.Types.ObjectId, ref: 'Police', require: true },
        status: { type: String, require: true },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('PoliceSession', policeSessionSchema); 