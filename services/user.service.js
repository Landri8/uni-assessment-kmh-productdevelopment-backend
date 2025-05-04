const userModel = require('../models/user.model');
const { hashPassword } = require('../utils/passwordUtil');

const getUserList = async () => {
    try {
        const users = await userModel.find({}, {password: 0});

        const modifiedData = users.map((item) => ({
            ...item.toObject(),
            _id: undefined,
        }));

        return modifiedData;
    } catch (error) {
        throw error;
    }
}

const getUserById = async (id) => {
    try {
        const user = await userModel.findOne({id: id}, {_id: 0,password: 0});

        return user;
    } catch (error) {
        throw error;
    }
}

const createUser = async (body) => {
    try {
        const existingUser = await userModel.findOne({ email: body.email });

        if (existingUser) {
            throw new Error('User already exists');
        }

        let hashedPassword = await hashPassword(body.password);
        const user = await userModel.create({
            name: body.name,
            email: body.email,
            password: hashedPassword,
            role: body.role
        });

        // Remove password before returning
        const userObject = user.toObject();
        delete userObject.password;

        return userObject;
    } catch (error) {
        throw error;
    }
}

const updateUser = async (body) => {
    try {
        const user = await userModel.findOne({email: body.email});
        if (!user) {
            throw new Error('User not found');
        }

        user.name = body.name;
        user.role = body.role;

        await user.save();
        return user;
    } catch (error) {
        throw error;
    }
}

const deleteUser = async (body) => {
    try {
        const user = await userModel.findOne({id: body.id});
        if (!user) {
            throw new Error('User not found');
        }

        await userModel.deleteOne({id: body.id});

        return {
            id: user.id,
        };
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getUserList,
    getUserById,
    createUser,
    updateUser,
    deleteUser
}