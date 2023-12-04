const Hospital = require('../models/Hospital');

const getHospital = async (req, res, next) => {
    const {
        params: { hospitalId },
    } = req;

    let hospital;

    if (!hospitalId) {
        res.status(400).json({message: "Parameter hospital id can not be empty" });
    }

    try {
        hospital = await Hospital.findOne({_id: hospitalId});
        if (hospital === null) return res.status(404).json({ message: "This hospital is not available" })
    }
    catch (error) {
        res.status(error?.status || 500).json({message: error?.message || error  });
    }

    res.hospital = hospital;
    next()
}

module.exports =  getHospital;