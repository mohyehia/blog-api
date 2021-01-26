const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const categoryController = require('../controller/category.controller');

router.get('/', checkAuth, categoryController.retrieveAllCategories);
router.post('/', checkAuth, categoryController.createNewCategory);

module.exports = router;