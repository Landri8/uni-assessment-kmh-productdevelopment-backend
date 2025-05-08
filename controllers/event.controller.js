const express = require('express');
const router = express.Router();

const eventService = require('../services/event.service');
const {sendResponse} = require('../utils/responseHandler');
const Joi = require('joi');

const getEventList = async (req, res) => {
    try {
        const eventListData = await eventService.getEventList();

        sendResponse(res, 200, 'Event list fetched successfully', eventListData);
    } catch (error) {
        sendResponse(res, 400, 'Fetching event list failed', error.message);
    }
}

const getEventById = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) throw new Error('Bad Request');
        const eventData = await eventService.getEventById(id);

        sendResponse(res, 200, 'Event info fetched successfully', eventData);
    } catch (error) {
        sendResponse(res, 400, 'Fetching event info failed', error.message);
    }
}

const createEvent = async (req, res) => {
    try {
        const body = req.body;
        let eventValidator = Joi.object({
            title: Joi.string().required().min(3),
            type: Joi.string().required(),
            location: Joi.string().required(),
            presenter: Joi.string().required(),
            timeRange: Joi.string().required(),
            date: Joi.string().required(),
            eventDesc: Joi.string().required(),
        })

        const {error} = eventValidator.validate(body);

        if (error) {
            console.log("ERROR: ", error);
            throw error;
        }

        const eventCreatedData = await eventService.createEvent(body);

        sendResponse(res, 200, 'Event created successfully', eventCreatedData);
    } catch (error) {
        console.log(error)
        sendResponse(res, 400, error.message, null);
    }
}

const updateEvent = async (req, res) => {
    try {
        const body = req.body;
        let updateEventValidator = Joi.object({
            id: Joi.string().required(),
            title: Joi.string().required().min(3),
            type: Joi.string().required(),
            location: Joi.string().required(),
            presenter: Joi.string().required(),
            timeRange: Joi.string().required(),
            date: Joi.string().required(),
            eventDesc: Joi.string().required(),
        })

        const {error} = updateEventValidator.validate(body);

        if (error) {
            console.log("ERROR: ", error);
            throw error;
        }

        const eventUpdatedData = await eventService.updateEvent(body);

        sendResponse(res, 200, 'Event updated successfully', eventUpdatedData);
    } catch (error) {
        console.log(error)
        sendResponse(res, 400, error.message, null);
    }
}

const deleteEvent = async (req, res) => {
    try {
        const body = req.body;

        if (!('id' in body)) throw new Error('Bad Request');

        const eventDeletedData = await eventService.deleteEvent(body);

        sendResponse(res, 200, 'Event deleted successfully', eventDeletedData);
    } catch (error) {
        console.log(error)
        sendResponse(res, 400, error.message, null);
    }
}

module.exports = { getEventList, getEventById, createEvent, updateEvent, deleteEvent };