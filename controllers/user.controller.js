const express = require('express');
const router = express.Router();

const userService = require('../services/user.service');
const {sendResponse} = require('../utils/responseHandler');
const Joi = require('joi');

const getUserList = async (req, res) => {
    try {
        const userListData = await userService.getUserList();

        sendResponse(res, 200, 'User list fetched successfully', userListData);
    } catch (error) {
        sendResponse(res, 400, 'Fetching user list failed', error.message);
    }
}

const getUserById = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) throw new Error('Bad Request');
        const userData = await userService.getUserById(id);

        sendResponse(res, 200, 'User info fetched successfully', userData);
    } catch (error) {
        sendResponse(res, 400, 'Fetching user info failed', error.message);
    }
}

const createUser = async (req, res) => {
    try {
        const body = req.body;
        let userValidator = Joi.object({
            name: Joi.string().required().min(3),
            email: Joi.string().email().required(),
            role: Joi.string().required(),
            password: Joi.string().min(8).pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)")).required(),
            confirmPassword: Joi.string().min(8).pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)")).required()
        })

        const {error} = userValidator.validate(body);

        if (error) {
            console.log("ERROR: ", error);
            throw error;
        }

        const userCreatedData = await userService.createUser(body);

        sendResponse(res, 200, 'User created successfully', userCreatedData);
    } catch (error) {
        console.log(error)
        sendResponse(res, 400, error.message, null);
    }
}

const updateUser = async (req, res) => {
    try {
        const body = req.body;
        let updateUserValidator = Joi.object({
            name: Joi.string().required().min(3),
            email: Joi.string().email().required(),
            role: Joi.string().required(),
        })

        const {error} = updateUserValidator.validate(body);

        if (error) {
            console.log("ERROR: ", error);
            throw error;
        }

        const userUpdatedData = await userService.updateUser(body);

        sendResponse(res, 200, 'User updated successfully', userUpdatedData);
    } catch (error) {
        console.log(error)
        sendResponse(res, 400, error.message, null);
    }
}

const deleteUser = async (req, res) => {
    try {
        const body = req.body;

        if (!('id' in body)) throw new Error('Bad Request');

        const userDeletedData = await userService.deleteUser(body);

        sendResponse(res, 200, 'User deleted successfully', userDeletedData);
    } catch (error) {
        console.log(error)
        sendResponse(res, 400, error.message, null);
    }
}

module.exports = { getUserList, getUserById, createUser, updateUser, deleteUser };