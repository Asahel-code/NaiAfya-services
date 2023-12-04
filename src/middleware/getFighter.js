const Fighter = require('../models/Fighter');

const getFighter = async (req, res, next) => {
    const {
        params: { fighterId },
    } = req;

    let fighter;

    if (!fighterId) {
        res.status(400).json({message: "Parameter fire fighter id can not be empty" });
    }

    try {
        fighter = await Fighter.findOne({_id: fighterId});
        if (fighter === null) return res.status(404).json({ message: "This fire fighter is not available" })
    }
    catch (error) {
        res.status(error?.status || 500).json({message: error?.message || error  });
    }

    res.fighter = fighter;
    next()
}

module.exports =  getFighter;