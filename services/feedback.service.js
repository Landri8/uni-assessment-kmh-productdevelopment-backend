const feedbackModel = require('../models/feedback.model');

const getFeedbackList = async () => {
    try {
        const feedbacks = await feedbackModel.find({});

        const modifiedData = feedbacks.map((item) => ({
            ...item.toObject(),
            _id: undefined,
        }));

        return modifiedData;
    } catch (error) {
        throw error;
    }
}

const deleteFeedback = async (body) => {
    try {
        const feedback = await feedbackModel.findOne({id: body.id});
        if (!feedback) {
            throw new Error('Feedback not found');
        }

        await feedbackModel.deleteOne({id: body.id});

        return {
            id: feedback.id,
        };
    } catch (error) {
        throw error;
    }
}

module.exports = {
    getFeedbackList,
    deleteFeedback
}