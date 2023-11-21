const Ambulance = require('../models/Ambulance');

const getAllAmbulances = async (req, res) => {
    try {
        const ambulances = await Ambulance.find();

        return res.status(200).json(ambulances);
    } catch (error) {
        return res.status(error?.status || 500).json({ message: error?.message || error })
    }
}

const getSpecificAmbulance = async (req, res) => {
    try {
        return res.status(200).json(res.ambulance);
    } catch (error) {
        return res.status(error?.status || 500).json({ message: error?.message || error })
    }
}

const addAmbulance = async (req, res) => {
    const { body } = req;

    const newAmbulance = new Ambulance({
        name: body?.name,
        contactNumber: body?.contactNumber
    });

    try {
        await newAmbulance.save();

        return res.status(201).json({ message: `${body?.name} created` })

    } catch (error) {
        return res.status(error?.status || 500).json({ message: error?.message || error })
    }
}

const updateAmbulance = async (req, res) => {
    const { body } = req;

    try {
        res.ambulance.name = body?.name;
        res.ambulance.contactNumber = body?.contactNumber;

        res.ambulance.save();

        return res.status(200).json({ message: `${body?.name} updated` })

    } catch (error) {
        return res.status(error?.status || 500).json({ message: error?.message || error })
    }
}

const deleteAmbulance = async (req, res) => {
    try {
        await Ambulance.deleteOne({ _id: res.ambulance._id });

        return res.status(204).json({ message: 'Ambulance service deleted' })

    } catch (error) {
        return res.status(error?.status || 500).json({ message: error?.message || error })
    }
}

module.exports = {
    getAllAmbulances,
    getSpecificAmbulance,
    addAmbulance,
    updateAmbulance,
    deleteAmbulance
}