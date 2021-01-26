const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const commentController = require('../controller/comment.controller');

router.get('/:postId', checkAuth, commentController.retrievePostComments);
router.post('/:postId', checkAuth, commentController.createNewComment);

module.exports = router;