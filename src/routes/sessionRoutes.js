const express = require('express');
const router = express.Router();
const ambulanceSessionController = require('../controller/ambulanceSessionController');
const hospitalSessionController = require('../controller/hospitalSessionController');
const fighterSessionController= require('../controller/fighterSessionController');
const policeSessionController = require('../controller/policeSessionController');
const verifyAuth = require('../middleware/verifyAuth');


router.get("/ambulance_session", verifyAuth, ambulanceSessionController.getAmbulanceSessionCount);
router.get("/hospital_session", verifyAuth, hospitalSessionController.getHospitalSessionCount);
router.get("/fire_fighter_session", verifyAuth, fighterSessionController.getFighterSessionCount);
router.get("/police_station_session", verifyAuth, policeSessionController.getPoliceSessionCount);

module.exports = router;