const Ambulance = require('../models/Ambulance');
const Hospital = require('../models/Hospital');

const getCount = async (req, res) => {
    try {
        const ambulances = await Ambulance.find();
        const hospitals = await Hospital.find();

        const ambulanceCount = ambulances.length;
        const hospitalCount = hospitals.length;

        return res.status(200).json({ ambulanceCount, hospitalCount })
    } catch (error) {
        return res.status(error?.status || 500).json({ message: error?.message || error })
    }
}

module.exports = {
    getCount
}