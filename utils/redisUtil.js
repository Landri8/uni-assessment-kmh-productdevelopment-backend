const redis = require('redis');
const dotenv = require('dotenv');

dotenv.config();

const redisClient = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
});

redisClient.on('error', (err) => {
  console.error('Redis Client Error:', err);
});

(async () => {
  await redisClient.connect();
})();

exports.setCache = async (key, value, ttl = null) => {
  try {
    await redisClient.set(key, JSON.stringify(value)); 
    if (ttl) {
      await redisClient.expire(key, ttl);
    }
  } catch (error) {
    console.error('Error setting cache:', error);
    throw error;
  }
};

exports.getCache = async (key) => {
  try {
    const value = await redisClient.get(key);
    return value ? JSON.parse(value) : null; 
  } catch (error) {
    console.error('Error getting cache:', error);
    throw error;
  }
};

exports.deleteCache = async (key) => {
  try {
    await redisClient.del(key);
  } catch (error) {
    console.error('Error deleting cache:', error);
    throw error;
  }
};