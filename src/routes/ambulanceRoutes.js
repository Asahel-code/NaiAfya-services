const express = require('express');
const router = express.Router();
const ambulanceController = require('../controller/ambulanceController');
const getAmbulance = require('../middleware/getAmbulance');
const verifyAuth = require('../middleware/verifyAuth');

router.get('/', verifyAuth, ambulanceController.getAllAmbulances);
router.get('/:ambulanceId', verifyAuth, getAmbulance, ambulanceController.getSpecificAmbulance);
router.post('/', verifyAuth, ambulanceController.addAmbulance);
router.patch('/:ambulanceId', verifyAuth, getAmbulance, ambulanceController.updateAmbulance);
router.delete('/:ambulanceId', verifyAuth, getAmbulance, ambulanceController.deleteAmbulance);

module.exports = router;