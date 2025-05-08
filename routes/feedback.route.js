const express = require('express');
const router = express.Router();

const feedbackController = require('../controllers/feedback.controller');

router.get('/', feedbackController.getFeedbackList);
router.post('/delete', feedbackController.deleteFeedback);

module.exports = router;