const mongoose = require('mongoose');
const Comment = require('../entity/comment.entity');
const Post = require('../entity/post.entity');

exports.retrievePostComments = (req, res, next) => {
    Comment.find({post: req.params.postId})
        .populate('post', '_id title content category user')
        .populate('user', 'firstName lastName')
        .then(comments => {
            res.status(200).json({
                count: comments.length,
                post: comments[0].post,
                comments: comments.map(comment => {
                    return {
                        id: comment._id,
                        user: comment.user,
                        content: comment.content,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:5000/comments/' + comment._id
                        }
                    }
                })
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
}

exports.createNewComment = (req, res, next) => {
    Post.findOne({slug: req.params.postSlug})
        .then(post => {
            if (!post) {
                return res.status(404).json({
                    message: 'Post not found!'
                });
            }
            const comment = new Comment({
                _id: new mongoose.Types.ObjectId(),
                content: req.body.content,
                user: req.userData.id,
                post: post._id
            });
            return comment.save()
        })
        .then(com => {
            res.status(201).json({
                message: 'Comment created successfully!',
                createdComment: {
                    id: com._id,
                    content: com.content,
                    post: com.post,
                    user: com.user,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:5000/comments/' + com._id
                    }
                }
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
}