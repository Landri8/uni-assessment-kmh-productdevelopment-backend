const { sendResponse } = require('../utils/responseHandler');
const joi = require('joi');

const messageService = require('../services/message.service');

const getMessageList = async (req, res) => {
    try {
        const messageListData = await messageService.getMessageList();
        sendResponse(res, 200, 'Message list fetched successfully', messageListData);
    } catch (e) {
        sendResponse(res, 400, 'Fetching message list failed', e.message);
    }
}

const getMessageStatistics = async (req, res) => {
    try {
        const messageStatistics = await messageService.getMessageStatistics();

        sendResponse(res, 200, 'Message statistics fetched', messageStatistics);
    } catch (e) {
        console.log(e)
        sendResponse(res, 400, e.message, null);
    }
}

const getMessageInfo = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) throw new Error('Bad Request');

        const messageData = await messageService.getMessageInfo(id);
        
        sendResponse(res, 200, 'Message info fetched', messageData);
    } catch (e) {
        sendResponse(res, 400, 'Fetching message info failed', e.message);
    }
}

const updateMessageToMarkRead = async (req, res) => {
    try {
        const body = req.body;
        if (!body.id) throw new Error('Bad Request')

        const messageUpdatedData = await messageService.updateMessageToMarkRead(body.id);
        sendResponse(res, 200, 'Marked as read', messageUpdatedData);
    } catch (e) {
        console.log(e)
        sendResponse(res, 400, 'Updating failed', e.message)
    }
}

const deleteMessage = async (req, res) => {
    try {
        const body = req.body;

        if (!('id' in body)) throw new Error('Bad Request');
        const messageDeletedData = await messageService.deleteMessage(body);
        sendResponse(res, 200, 'Message Deleted', messageDeletedData);
    } catch (e) {
        console.log(error)
        sendResponse(res, 400, error.message, null);
    }
}

const replyMessage = async (req, res) => {
    try {
        const body = req.body;

        const validator = joi.object({
            messageId: joi.string().required(),
            replyText: joi.string().required(),
        })

        const { error } = validator.validate(body);
        if (error) throw new Error(error.details[0].message);

        const messageRepliedData = await messageService.replyMessage(body.messageId, body.replyText);

        sendResponse(res, 200, 'Message Replied', messageRepliedData);
    } catch (e) {
        console.log(e)
        sendResponse(res, 400, e.message, null);
    }
}

module.exports = {
    getMessageList,
    updateMessageToMarkRead,
    getMessageInfo,
    deleteMessage,
    replyMessage,
    getMessageStatistics
}