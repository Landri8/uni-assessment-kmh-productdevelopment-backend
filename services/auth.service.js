const userModel = require('../models/user.model');
const { getCurrentFormattedDate, getCurrentFormattedDateTime } = require('../utils/commonUtil');
const { generateToken } = require('../utils/jwtUtil');
const { verifyPassword } = require('../utils/passwordUtil');
const { setCache, getCache, deleteCache } = require('../utils/redisUtil');

const login = async (body) => {
    try {
        // Ensure email is lowercase to avoid case sensitivity issues
        const user = await userModel.findOne({ email: body.email.toLowerCase() });

        if (!user) {
            throw new Error('User not found');
        }

        // Check if user is already logged in
        if (user.id !== "USR000000001") {
            const loggedAt = await getCache(user.id);
            if (loggedAt) {
                throw new Error('Already logged in!');
            }
        }

        // Verify password
        const isPasswordValid = await verifyPassword(body.password, user.password);
        if (!isPasswordValid) {
            throw new Error('Invalid password');
        }

        // Generate tokens
        const accessToken = generateToken({
            userId: user.id,
            email: user.email,
            role: user.role
        }, '1m');

        const refreshToken = generateToken({
            userId: user.id,
        }, '7d');

        // Store login time in cache
        await setCache(user.id, {
            loggedAt: getCurrentFormattedDateTime(),
        });

        // Remove sensitive data before returning user info
        return {
            accessToken,
            refreshToken,
            user: {
                ...user.toObject(),
                _id: undefined,  // Remove _id
                password: undefined  // Remove password
            }
        };
    } catch (error) {
        throw new Error(error.message);  // Ensure the error message is passed properly
    }
};

const logout = async (body) => {
    try {
        const user = await userModel.findOne({email: body.email});

        if (!user || user.id !== body.id) {
            throw new Error('User not found');
        }

        const loggedAt = await getCache(user.id);
        if (!loggedAt) {
            throw new Error('User is not logged in!');
        }

        await deleteCache(user.id);
    } catch (error) {
        throw error;
    }
}

const refreshToken = async (id) => {
    try {
        console.log(id);
        const user = await userModel.findOne({id: id});
        console.log(user);
        if (!user) {
            throw new Error('User not found');
        }
        const accessToken = generateToken({
            userId: user.id,
            email: user.email,
            role: user.role
        }, '1m')
        const refreshToken = generateToken({
            userId: user.id,
        }, '7d')

        return {
            accessToken,
            refreshToken,
            user: {
                ...user.toObject(),
                _id: undefined,
                password: undefined
            }
        }


    } catch (error) {
        throw error;
    }
}

module.exports = {
    login,
    logout,
    refreshToken
}