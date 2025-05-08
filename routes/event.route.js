const express = require('express');
const router = express.Router();

const eventController = require('../controllers/event.controller');

router.get('/', eventController.getEventList);
router.post('/create', eventController.createEvent);
router.post('/update', eventController.updateEvent);
router.post('/delete', eventController.deleteEvent);
router.get('/:id', eventController.getEventById);

module.exports = router;