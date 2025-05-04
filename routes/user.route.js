const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');

router.get('/', userController.getUserList);
router.post('/create', userController.createUser);
router.post('/update', userController.updateUser);
router.post('/delete', userController.deleteUser);
router.get('/:id', userController.getUserById);

module.exports = router;