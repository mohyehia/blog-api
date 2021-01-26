const express = require('express');
const router = express.Router();

const userController = require('../controller/user.controller');
const checkAuth = require('../middleware/check-auth');

router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.post('/update', checkAuth, userController.update);

module.exports = router;