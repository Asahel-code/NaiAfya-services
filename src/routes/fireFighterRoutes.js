const express = require('express');
const router = express.Router();
const fighterController = require('../controller/fighterController');
const getFighter = require('../middleware/getFighter');
const verifyAuth = require('../middleware/verifyAuth');

router.get('/', verifyAuth, fighterController.getAllFighters);
router.get('/:figherId', verifyAuth, getFighter, fighterController.getSpecificFighter);
router.post('/', verifyAuth, fighterController.addFighter);
router.patch('/:figherId', verifyAuth, getFighter, fighterController.updateFighter);
router.delete('/:figherId', verifyAuth, getFighter, fighterController.deleteFighter);

module.exports = router;