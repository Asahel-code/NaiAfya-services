const express = require('express');
const router = express.Router();
const countController = require('../controller/countController');
const verifyAuth = require('../middleware/verifyAuth');

router.get('/', verifyAuth, countController.getCount);

module.exports = router;