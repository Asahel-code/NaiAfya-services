const express = require('express');
const router = express.Router();
const ussdController = require('../controller/ussdController');

router.post('/', ussdController.connectToUssdService);

module.exports = router;