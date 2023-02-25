const express = require('express');
const router = express.Router();
const callController = require('../controller/callController');

router.post('/', callController.connectClientToAService);

module.exports = router;