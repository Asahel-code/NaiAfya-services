const HospitalSession = require('../models/HospitalSession');

const getHospitalSessionCount = async (req, res) => {
    try {
        const { hospitalId, startDate, endDate } = req.query;

        const hospitalSessions = await HospitalSession.find({ hospital: hospitalId });

        const requiredHospitalSessions = hospitalSessions.filter((hospitalSession) => new Date(hospitalSession.createdAt) >= new Date(startDate) && new Date(hospitalSession.createdAt) <= new Date(endDate));

        const successful = requiredHospitalSessions.reduce((acc, obj) => obj?.status === "success" ? acc + 1 : acc, 0);
        const failed = requiredHospitalSessions.reduce((acc, obj) => obj?.status === "failed" ? acc + 1 : acc, 0);

        return res.status(200).json({ successful, failed });
    } catch (error) {
        return res.status(error?.status || 500).json({ message: error?.message || error })
    }
}

module.exports = {
    getHospitalSessionCount
}