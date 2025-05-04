const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth.controller');
const { validateRefreshToken, validateAuthUser } = require('../middlewares/auth.middleware');

router.post('/login', authController.login);

router.post('/logout', validateAuthUser, authController.logout);
router.post('/refreshtoken', validateRefreshToken, authController.refreshToken);


module.exports = router;