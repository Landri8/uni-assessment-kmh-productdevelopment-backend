const mongoose = require('mongoose');
const { generateID, getCurrentFormattedDate } = require('../utils/commonUtil');

const eventSchema = new mongoose.Schema({
    id: {type: String, default: () =>  generateID('EVT'), unique: true},
    title: {type: String, required: true},
    type: {type: String, required: true},
    location: {type: String, required: true},
    presenter: {type: String, required: true},
    timeRange: {type: String, required: true},
    date: {type: String, required: true},
    eventDesc: {type: String, required: true},
    createdAt: {type: String, default: () => getCurrentFormattedDate()},
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;