const mongoose = require('mongoose');
const { generateID, getCurrentFormattedDate } = require('../utils/commonUtil');

const messageSchema = new mongoose.Schema({
    id: {type: String, default: () =>  generateID('MSG'), unique: true},
    firstName: {type: String, required: true},
    lastName: {type: String},
    email: {type: String, required: true},
    phone: {type: String, required: true},
    companyName: {type: String, required: true},
    country: {type: String, required: true},
    jobTitle: {type: String, required: true},
    jobDetails: {type: String, required: true},
    read: {type: Boolean, default: false},
    createdAt: {type: String, default: () => getCurrentFormattedDate()},
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;