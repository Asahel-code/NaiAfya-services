const Police = require('../models/Police');

const getPoliceStation = async (req, res, next) => {
    const {
        params: { policeId },
    } = req;

    let policeStation;

    if (!policeId) {
        res.status(400).json({message: "Parameter police station id can not be empty" });
    }

    try {
        policeStation = await Police.findOne({_id: policeId});
        if (policeStation === null) return res.status(404).json({ message: "This police station is not available" })
    }
    catch (error) {
        res.status(error?.status || 500).json({message: error?.message || error  });
    }

    res. policeStation = policeStation;
    next()
}

module.exports =  getPoliceStation;