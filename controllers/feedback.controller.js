const express = require('express');

const feedbackService = require('../services/feedback.service');
const {sendResponse} = require('../utils/responseHandler');
const Joi = require('joi');

const getFeedbackList = async (req, res) => {
    try {
        const feedbackListData = await feedbackService.getFeedbackList();

        sendResponse(res, 200, 'Feedback list fetched successfully', feedbackListData);
    } catch (error) {
        sendResponse(res, 400, 'Fetching feedback list failed', error.message);
    }
}

const deleteFeedback = async (req, res) => {
    try {
        const body = req.body;

        if (!('id' in body)) throw new Error('Bad Request');

        const feedbackDeletedData = await feedbackService.deleteFeedback(body);

        sendResponse(res, 200, 'Feedback deleted successfully', feedbackDeletedData);
    } catch (error) {
        console.log(error)
        sendResponse(res, 400, error.message, null);
    }
}

module.exports = { getFeedbackList, deleteFeedback };