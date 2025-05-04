const joi = require('joi');
const { sendResponse } = require('../utils/responseHandler');
const authService = require('../services/auth.service');

const login = async (req, res) => {
    try {
        const body = req.body;

        // Joi validation
        const validator = joi.object({
            email: joi.string().email().required(),
            password: joi.string().regex(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%#*?&]{8,}$/,
                "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
            ).required()
        });

        const { error } = validator.validate(body);
        if (error) {
            return sendResponse(res, 400, error.details[0].message, null);  // Added `return` to stop execution
        }

        // Call authService for login logic
        const responseData = await authService.login(body);

        return sendResponse(res, 200, 'Login successful', responseData);
    } catch (e) {
        console.error(e);  // Log actual error
        return sendResponse(res, 400, e.message || "Invalid email or password", null);
    }
};

const logout = async (req, res) => {
    try {
        const body = req.body;

        const validator = joi.object({
            id: joi.string().required(),
            email: joi.string().email().required(),
        });

        const {error} = validator.validate(body);
        if (error) {
            sendResponse(res, 400, error.details[0].message, null);
        }

        const responseData = await authService.logout(body);

        sendResponse(res, 200, 'Logout successful', responseData);
    } catch (error) {
        sendResponse(res, 400, error.message, null);
    }
}

const refreshToken = async (req, res) => {
    try {
        const body = req.user;
        if (!('userId' in body)) {
            throw new Error('User not found');
        }

        const refreshTokenData = await authService.refreshToken(body.userId);
        console.log("body: ", body);
        sendResponse(res, 200, 'success', refreshTokenData);
    } catch (error) {
        sendResponse(res, 700, 'Error refresh token', error.message);
    }
}

module.exports = { login, logout, refreshToken };