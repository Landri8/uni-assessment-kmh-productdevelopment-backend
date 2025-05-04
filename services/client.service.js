const messageModel = require('../models/message.model');

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

module.exports = {
    sendMessage,
}