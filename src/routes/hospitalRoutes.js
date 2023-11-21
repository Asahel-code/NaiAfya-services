const express = require('express');
const router = express.Router();
const hospitalController = require('../controller/hospitalController');
const getHospital = require('../middleware/getHospital');
const verifyAuth = require('../middleware/verifyAuth');

router.get('/', verifyAuth, hospitalController.getAllHospitals);
router.get('/:hospitalId', verifyAuth, getHospital, hospitalController.getSpecificHospital);
router.post('/', verifyAuth, hospitalController.addHospital);
router.patch('/:hospitalId', verifyAuth, getHospital, hospitalController.updateHospital);
router.delete('/:hospitalId', verifyAuth, getHospital, hospitalController.deleteHospital);

module.exports = router;