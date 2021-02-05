const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const upload = require('../middleware/upload-photo');

const postController = require('../controller/post.controller');

router.get('/', checkAuth, postController.retrieveUserPosts);
router.get('/all', checkAuth, postController.retrieveAllPosts);
router.get('/:slug', checkAuth, postController.retrievePostBySlug);
router.post('/', checkAuth, upload.single('photo'), postController.createNewPost);

module.exports = router;