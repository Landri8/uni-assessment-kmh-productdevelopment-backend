const { v4: uuidv4 } = require('uuid');

const getCurrentFormattedDate = () => {
    const now = new Date();
    return `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}`;
};

const getCurrentFormattedDateTime = () => {
    const now = new Date();
    return `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}T${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}${String(now.getSeconds()).padStart(2, '0')}`;
};

const convertDateTimeToYYYYMMDDHHMMSS = (dateTime) => {
    const date = new Date(dateTime);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}${month}${day}${hours}${minutes}${seconds}`;
}

const generateID = (prefix) => {
    return `${prefix}${uuidv4().replace(/-/g, '').slice(0, 16)}`;
}

const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000);
}

module.exports = { getCurrentFormattedDate, generateID, convertDateTimeToYYYYMMDDHHMMSS, getCurrentFormattedDateTime, generateOTP };