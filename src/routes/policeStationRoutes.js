const express = require('express');
const router = express.Router();
const policeController = require('../controller/policeController');
const getPoliceStation = require('../middleware/getPoliceStation');
const verifyAuth = require('../middleware/verifyAuth');

router.get('/', verifyAuth, policeController.getAllPoliceStations);
router.get('/:policeId', verifyAuth, getPoliceStation, policeController.getSpecificPoliceStation);
router.post('/', verifyAuth, policeController.addPoliceStation);
router.patch('/:policeId', verifyAuth, getPoliceStation, policeController.updatePoliceStation);
router.delete('/:policeId', verifyAuth, getPoliceStation, policeController.deletePoliceStation);

module.exports = router;