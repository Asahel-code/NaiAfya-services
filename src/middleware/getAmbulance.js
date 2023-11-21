const Ambulance = require('../models/Ambulance');

const getAmbulance = async (req, res, next) => {
    const {
        params: { ambulanceId },
    } = req;

    let ambulance

    if (!ambulanceId) {
        res.status(400).json({message: "Parameter ambulance id can not be empty" });
    }

    try {
        ambulance = await Ambulance.findOne({_id: ambulanceId});
        if (ambulance === null) return res.status(404).json({ message: "This ambulance is not available" })
    }
    catch (error) {
        res.status(error?.status || 500).json({message: error?.message || error  });
    }

    res.ambulance = ambulance;
    next()
}

module.exports = getAmbulance;