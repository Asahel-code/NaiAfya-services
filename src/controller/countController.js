const Ambulance = require('../models/Ambulance');
const Hospital = require('../models/Hospital');
const Fighter = require('../models/Fighter');
const Police = require('../models/Police');

const getCount = async (req, res) => {
    try {
        const ambulances = await Ambulance.find();
        const hospitals = await Hospital.find();
        const policeStations = await Police.find();
        const fireFighters = await Fighter.find();

        const ambulanceCount = ambulances.length;
        const hospitalCount = hospitals.length;
        const fireFighterCount =  fireFighters.length;
        const policeStationCount = policeStations.length;

        return res.status(200).json({ ambulanceCount, hospitalCount, fireFighterCount, policeStationCount })
    } catch (error) {
        return res.status(error?.status || 500).json({ message: error?.message || error })
    }
}

module.exports = {
    getCount
}