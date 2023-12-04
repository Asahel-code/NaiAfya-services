const FighterSession = require('../models/FighterSession');

const getFighterSessionCount = async (req, res) => {
    try {
        const { fighterId, startDate, endDate } = req.query;

        const fighterSessions = await FighterSession.find({ fighter: fighterId });

        const requiredFighterSessions = fighterSessions.filter((fighterSession) => new Date(fighterSession.createdAt) >= new Date(startDate) && new Date(fighterSession.createdAt) <= new Date(endDate));

        const successful = requiredFighterSessions.reduce((acc, obj) => obj?.status === "success" ? acc + 1 : acc, 0);
        const failed = requiredFighterSessions.reduce((acc, obj) => obj?.status === "failed" ? acc + 1 : acc, 0);

        return res.status(200).json({ successful, failed });
    } catch (error) {
        return res.status(error?.status || 500).json({ message: error?.message || error })
    }
}

module.exports = {
    getFighterSessionCount
}