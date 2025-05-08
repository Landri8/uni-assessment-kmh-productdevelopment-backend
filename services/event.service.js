const eventModel = require('../models/event.model');
const { hashPassword } = require('../utils/passwordUtil');

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

const getEventById = async (id) => {
    try {
        const event = await eventModel.findOne({id: id});

        return event;
    } catch (error) {
        throw error;
    }
}

const createEvent = async (body) => {
    try {

        const event = await eventModel.create({
            title: body.title,
            type: body.type,
            location: body.location,
            presenter: body.presenter,
            timeRange: body.timeRange,
            date: body.date,
            eventDesc: body.eventDesc
        });

        // Remove password before returning
        const eventObject = event.toObject();
        delete eventObject.password;

        return eventObject;
    } catch (error) {
        throw error;
    }
}

const updateEvent = async (body) => {
    try {
        const event = await eventModel.findOne({id: body.id});
        if (!event) {
            throw new Error('Event not found');
        }

        event.title = body.title;
        event.type = body.type;
        event.location = body.location;
        event.presenter = body.presenter;
        event.timeRange = body.timeRange;
        event.date = body.date;
        event.eventDesc = body.eventDesc;

        await event.save();
        return event;
    } catch (error) {
        throw error;
    }
}

const deleteEvent = async (body) => {
    try {
        const event = await eventModel.findOne({id: body.id});
        if (!event) {
            throw new Error('Event not found');
        }

        await eventModel.deleteOne({id: body.id});

        return {
            id: event.id,
        };
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getEventList,
    getEventById,
    createEvent,
    updateEvent,
    deleteEvent
}