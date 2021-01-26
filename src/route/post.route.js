const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const postController = require('../controller/post.controller');

router.get('/', checkAuth, postController.retrieveUserPosts);
router.post('/', checkAuth, postController.createNewPost);

module.exports = router;