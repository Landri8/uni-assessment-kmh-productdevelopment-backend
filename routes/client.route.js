const express = require('express')
const router = express.Router()

const clientController = require('../controllers/client.controller')

router.post('/messages', clientController.sendMessage);
router.get('/events', clientController.getEventList);
router.get('/lastThreeFeedbacks', clientController.getLastThreeFeedbackList);
router.get('/feedbacks', clientController.getFeedbackList);
router.post('/feedbacks', clientController.sendFeedback);
router.post('/otp/get', clientController.getVerificationCodeForEmail);
router.post('/otp/verify', clientController.verifyEmail);

router.post('/getHashedPassword', clientController.getHashedPassword);

module.exports = router;