const AmbulanceSession = require('../models/AmbulanceSession');

const getAmbulanceSessionCount = async (req, res) => {
    try {
        const { ambulanceId, startDate, endDate } = req.query;

        const ambulanceSessions = await AmbulanceSession.find({ ambulance: ambulanceId });

        const requiredAmbulanceSessions = ambulanceSessions.filter((ambulanceSession) => new Date(ambulanceSession.createdAt) >= new Date(startDate) && new Date(ambulanceSession.createdAt) <= new Date(endDate));

        const successful = requiredAmbulanceSessions.reduce((acc, obj) => obj?.status === "success" ? acc + 1 : acc, 0);
        const failed = requiredAmbulanceSessions.reduce((acc, obj) => obj?.status === "failed" ? acc + 1 : acc, 0);

        return res.status(200).json({ successful, failed });
    } catch (error) {
        return res.status(error?.status || 500).json({ message: error?.message || error })
    }
}

module.exports = {
    getAmbulanceSessionCount
}