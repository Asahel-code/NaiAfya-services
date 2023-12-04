const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const fighterSessionSchema = new Schema(
    {
        fighter: { type: Schema.Types.ObjectId, ref: 'Fighter', require: true },
        status: { type: String, require: true },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('FighterSession', fighterSessionSchema); 