const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');
const verifyAuth = require('../middleware/verifyAuth');

router.post('/', authController.handleLogin);
router.post('/passwordResetRequest', authController.handlePasswordResetRequest);
router.post('/resetPassword', authController.resetPassword);
router.post('/verifyAccount', verifyAuth, authController.verifyAccount);
router.get('/resendVerificationToken', verifyAuth, authController.resendVerificationToken);
router.get('/user', verifyAuth, authController.fetchUser);
router.patch('/user/update_profile', verifyAuth, authController.updateUser);

module.exports = router;