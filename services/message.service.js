const messageModel = require('../models/message.model');
const { sendEmail } = require('../utils/mailUtil');

const getMessageList = async () => {
    try {
        const messages = await messageModel.find({}, {_id: 0});
        return messages;
    } catch (e) {
        throw error;
    }
}

const getMessageInfo = async (id) => {
    try {
        const message = await messageModel.findOne({id: id}, {_id: 0});

        return message;
    } catch (e) {
        throw error;
    }
}

const updateMessageToMarkRead = async (id) => {
    try {
        const message = await messageModel.findOne({id: id});

        if (!message) throw new Error('Message not found');

        message.read = true;

        await message.save();

        return {
            ...message.toObject(),
            _id: undefined
        }
    } catch (e) {

    }
}

const deleteMessage = async (body) => {
    try {
        const message = await messageModel.findOne({id: body.id});
        if (!message) {
            throw new Error('Message not found');
        }

        await messageModel.deleteOne({id: body.id});

        return {
            id: message.id,
        };
    } catch (e) {
        throw error;
    }
}

const replyMessage = async (messageId, replyText) => {
    try {
        const message = await messageModel.findOne({id: messageId});
        if (!message) {
            throw new Error('Message not found');
        }

        await sendEmail(message.email, "Message Reply", replyText, "");
        message.read = true;

        await message.save();

        return {
            id: message.id,
        };
    } catch (e) {
        throw e;
    }
}


const getMessageStatistics = async () => {
    try {
        const readUnreadStats = await messageModel.aggregate([
            {
            $group: {
                _id: "$read",
                count: { $sum: 1 }
            }
            }
        ]);
    
        // Transform the result into a more user-friendly format
        const readUnreadCounts = {
            read: 0,
            unread: 0
        };
    
        readUnreadStats.forEach(stat => {
            if (stat._id === true) {
            readUnreadCounts.read = stat.count;
            } else {
            readUnreadCounts.unread = stat.count;
            }
        });
    
        const allMessages = await messageModel.find({}, { createdAt: 1 });
        
        // Initialize month counts
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const monthlyCounts = {};
        
        // Get current date information
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth(); // 0-11
        
        // Initialize with zero counts for the past 12 months
        for (let i = 0; i < 12; i++) {
            let month = currentMonth - i;
            let year = currentYear;
            
            if (month < 0) {
            month += 12;
            year -= 1;
            }
            
            monthlyCounts[monthNames[month]] = 0;
        }
        
        // Calculate the date 12 months ago
        let startMonth = currentMonth + 1;
        let startYear = currentYear - 1;
        if (startMonth > 12) {
            startMonth -= 12;
            startYear += 1;
        }
        const startDate = `${startYear}${startMonth.toString().padStart(2, '0')}01`;
        
        // Count messages by month
        allMessages.forEach(message => {
            if (message.createdAt >= startDate) {
            // Get month from the createdAt string (YYYYMMDD format)
            const monthStr = message.createdAt.substring(4, 6);
            const monthIndex = parseInt(monthStr, 10) - 1; // Convert to 0-11 index
            
            // Only consider messages from the past 12 months
            const yearStr = message.createdAt.substring(0, 4);
            const messageYear = parseInt(yearStr, 10);
            const messageYearMonth = parseInt(yearStr + monthStr, 10);
            
            // Check if this message is within the past 12 months
            const now = new Date();
            const yearDiff = currentYear - messageYear;
            
            if ((yearDiff === 0 && monthIndex <= currentMonth) || 
                (yearDiff === 1 && monthIndex > currentMonth)) {
                monthlyCounts[monthNames[monthIndex]]++;
            }
            }
        });
    
        // 3. Get the latest 5 messages
        const latestMessages = await messageModel.find()
            .sort({ createdAt: -1 })
            .limit(5);
    
        return {
            readUnreadCounts,
            monthlyCounts,
            latestMessages
        };
    } catch (e) {
        throw e;
    }
}

module.exports = {
    getMessageList,
    getMessageInfo,
    updateMessageToMarkRead,
    deleteMessage,
    replyMessage,
    getMessageStatistics
}