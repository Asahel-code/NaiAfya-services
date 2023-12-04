const Fighter = require('../models/Fighter');

const getAllFighters = async (req, res) => {
    try {
        const fighters = await Fighter.find();

        return res.status(200).json(fighters);
    } catch (error) {
        return res.status(error?.status || 500).json({ message: error?.message || error })
    }
}

const getSpecificFighter = async (req, res) => {
    try {
        return res.status(200).json(res.fighter);
    } catch (error) {
        return res.status(error?.status || 500).json({ message: error?.message || error })
    }
}

const addFighter = async (req, res) => {
    const { body } = req;

    const newFighter = new Fighter({
        name: body?.name,
        contactNumber: body?.contactNumber
    });

    try {
        await newFighter.save();

        return res.status(201).json({ message: `${body?.name} created` })

    } catch (error) {
        return res.status(error?.status || 500).json({ message: error?.message || error })
    }
}

const updateFighter = async (req, res) => {
    const { body } = req;

    try {
        res.fighter.name = body?.name;
        res.fighter.contactNumber = body?.contactNumber;

        res.fighter.save();

        return res.status(200).json({ message: `${body?.name} updated` })

    } catch (error) {
        return res.status(error?.status || 500).json({ message: error?.message || error })
    }
}

const deleteFighter = async (req, res) => {
    try {
        await Fighter.deleteOne({ _id: res.fighter._id });

        return res.status(204).json({ message: 'Fighter service deleted' })

    } catch (error) {
        return res.status(error?.status || 500).json({ message: error?.message || error })
    }
}

module.exports = {
    getAllFighters,
    getSpecificFighter,
    addFighter,
    updateFighter,
    deleteFighter
}