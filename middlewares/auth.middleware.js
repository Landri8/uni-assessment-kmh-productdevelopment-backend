const jwt = require('jsonwebtoken');
const { sendResponse } = require('../utils/responseHandler');
const { validateToken } = require('../utils/jwtUtil');
const { getCache } = require('../utils/redisUtil');

exports.validateAuthUser = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  console.log("token: ",token);

  if (!token) {
    return sendResponse(res, 800, 'User is not authenticated.', null);
  }

  try {
    const decodedJWT = validateToken(token);
    console.log("decoded", decodedJWT);
    const isLogged = await getCache(decodedJWT.userId);
    console.log(isLogged);
    if (!isLogged) {
      return sendResponse(res, 800, 'User is not authenticated.', null);
    }

    req.user = decodedJWT;

    next();
  } catch (error) {
    console.log("ERROR: ",error)
    return sendResponse(res, 700, 'Token expired.', null);
  }
};

exports.validateRefreshToken = (req, res, next) => {
  const refreshToken = req.header('Authorization')?.replace('Bearer ', '');
  console.log(refreshToken);
  if (!refreshToken) {
    return sendResponse(res, 800, 'User is not authenticated.', null);
  }

  try {
    const decodedJWT = validateToken(refreshToken);
    req.user = decodedJWT;
    next();
  } catch (error) {
    console.log("ERROR: ",error)
    return sendResponse(res, 700, 'Token expired.', null);
  }
};