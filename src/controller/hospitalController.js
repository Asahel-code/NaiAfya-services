const Hospital = require('../models/Hospital');

const getAllHospitals = async (req, res) => {
    try {
        const hospitals = await Hospital.find();

        return res.status(200).json(hospitals);
    } catch (error) {
        return res.status(error?.status || 500).json({ message: error?.message || error })
    }
}

const getSpecificHospital = async (req, res) => {
    try {
        return res.status(200).json(res.hospital);
    } catch (error) {
        return res.status(error?.status || 500).json({ message: error?.message || error })
    }
}

const addHospital = async (req, res) => {
    const { body } = req;

    const newHospital = new Hospital({
        name: body?.name,
        contactNumber: body?.contactNumber
    });

    try {
        await newHospital.save();

        return res.status(201).json({ message: `${body?.name} created` })

    } catch (error) {
        return res.status(error?.status || 500).json({ message: error?.message || error })
    }
}

const updateHospital = async (req, res) => {
    const { body } = req;

    try {
        res.hospital.name = body?.name;
        res.hospital.contactNumber = body?.contactNumber;

        res.hospital.save();

        return res.status(200).json({ message: `${body?.name} updated` })

    } catch (error) {
        return res.status(error?.status || 500).json({ message: error?.message || error })
    }
}

const deleteHospital = async (req, res) => {
    try {
        await Hospital.deleteOne({ _id: res.hospital._id });

        return res.status(204).json({ message: 'hospital service deleted' })

    } catch (error) {
        return res.status(error?.status || 500).json({ message: error?.message || error })
    }
}

module.exports = {
    getAllHospitals,
    getSpecificHospital,
    addHospital,
    updateHospital,
    deleteHospital
}