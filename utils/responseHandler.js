const sendResponse = (res, statusCode, message, data) => {
    res.status(200).json({
        statusCode,
        message,
        data
    });
}

module.exports = { sendResponse };