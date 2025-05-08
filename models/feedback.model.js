const mongoose = require('mongoose');
const { generateID, getCurrentFormattedDate } = require('../utils/commonUtil');

const feedbackSchema = new mongoose.Schema({
    id: {type: String, default: () =>  generateID('MSG'), unique: true},
    name: {type: String, required: true},
    role: {type: String},
    company: {type: String},
    rating: {type: Number, required: true},
    feedback: {type: String, required: true},
    createdAt: {type: String, default: () => getCurrentFormattedDate()},
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;