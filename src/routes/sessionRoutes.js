const express = require('express');
const router = express.Router();
const ambulanceSessionController = require('../controller/ambulanceSessionController');
const hospitalSessionController = require('../controller/hospitalSessionController');
const verifyAuth = require('../middleware/verifyAuth');


router.get("/ambulance_session", verifyAuth, ambulanceSessionController.getAmbulanceSessionCount);
router.get("/hospital_session", verifyAuth, hospitalSessionController.getHospitalSessionCount);

module.exports = router;