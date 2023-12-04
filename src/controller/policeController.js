const Police = require('../models/Police');

const getAllPoliceStations = async (req, res) => {
    try {
        const policetations = await Police.find();

        return res.status(200).json(policetations);
    } catch (error) {
        return res.status(error?.status || 500).json({ message: error?.message || error })
    }
}

const getSpecificPoliceStation = async (req, res) => {
    try {
        return res.status(200).json(res.policeStation);
    } catch (error) {
        return res.status(error?.status || 500).json({ message: error?.message || error })
    }
}

const addPoliceStation = async (req, res) => {
    const { body } = req;

    const newPoliceStation = new Police({
        name: body?.name,
        contactNumber: body?.contactNumber
    });

    try {
        await newPoliceStation.save();

        return res.status(201).json({ message: `${body?.name} created` })

    } catch (error) {
        return res.status(error?.status || 500).json({ message: error?.message || error })
    }
}

const updatePoliceStation = async (req, res) => {
    const { body } = req;

    try {
        res.policeStation.name = body?.name;
        res.policeStation.contactNumber = body?.contactNumber;

        res.policeStation.save();

        return res.status(200).json({ message: `${body?.name} updated` })

    } catch (error) {
        return res.status(error?.status || 500).json({ message: error?.message || error })
    }
}

const deletePoliceStation = async (req, res) => {
    try {
        await Police.deleteOne({ _id: res.policetation._id });

        return res.status(204).json({ message: 'Police station deleted' })

    } catch (error) {
        return res.status(error?.status || 500).json({ message: error?.message || error })
    }
}

module.exports = {
    getAllPoliceStations,
    getSpecificPoliceStation,
    addPoliceStation,
    updatePoliceStation,
    deletePoliceStation
}