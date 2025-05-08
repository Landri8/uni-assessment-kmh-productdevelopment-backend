const messageModel = require('../models/message.model');
const eventModel = require('../models/event.model');
const feedbackModel = require('../models/feedback.model');

const sendMessage = async (body) => {
    try {
        const message = await messageModel.create(body);

        return {
            ...message.toObject(),
            _id: undefined
        };
    } catch (e) {
        throw e;
    }
}

const sendFeedback = async (body) => {
    try {
        const message = await feedbackModel.create(body);

        return {
            ...message.toObject(),
            _id: undefined
        };
    } catch (e) {
        throw e;
    }
}

const getEventList = async () => {
    try {
        const events = await eventModel.find({});

        const modifiedData = events.map((item) => ({
            ...item.toObject(),
            _id: undefined,
        }));

        return modifiedData;
    } catch (error) {
        throw error;
    }
}

const getFeedbackList = async () => {
    try {
        const events = await feedbackModel.find({});

        const modifiedData = events.map((item) => ({
            ...item.toObject(),
            _id: undefined,
        }));

        return modifiedData;
    } catch (error) {
        throw error;
    }
}


const getLastThreeFeedbackList = async () => {
    try {
        const events = await feedbackModel
            .find({})
            .sort({ createdAt: -1 }) // Sort by newest first
            .limit(3);

        const modifiedData = events.map((item) => ({
            ...item.toObject(),
            _id: undefined,
        }));

        return modifiedData;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    sendMessage,
    sendFeedback,
    getEventList,
    getFeedbackList,
    getLastThreeFeedbackList
}