const mongoose = require('mongoose');
const dotenv = require('dotenv')

dotenv.config();

const connectdb = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log("DB Connected...");
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    connectdb
}