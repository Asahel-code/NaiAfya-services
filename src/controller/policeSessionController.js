const PoliceSession = require('../models/PoliceSession');

const getPoliceSessionCount = async (req, res) => {
    try {
        const { policeId, startDate, endDate } = req.query;

        const policeSessions = await PoliceSession.find({ police: policeId });

        const requiredPoliceSessions = policeSessions.filter((policeSession) => new Date(policeSession.createdAt) >= new Date(startDate) && new Date(policeSession.createdAt) <= new Date(endDate));

        const successful = requiredPoliceSessions.reduce((acc, obj) => obj?.status === "success" ? acc + 1 : acc, 0);
        const failed = requiredPoliceSessions.reduce((acc, obj) => obj?.status === "failed" ? acc + 1 : acc, 0);

        return res.status(200).json({ successful, failed });
    } catch (error) {
        return res.status(error?.status || 500).json({ message: error?.message || error })
    }
}

module.exports = {
    getPoliceSessionCount
}