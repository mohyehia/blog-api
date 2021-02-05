const mongoose = require('mongoose');
const Post = require('../entity/post.entity');
const Comment = require('../entity/comment.entity');

exports.retrieveUserPosts = (req, res, next) => {
    const {userData} = req;
    const query = {
        user: userData.id
    };
    Post.find(query)
        .sort({createdAt: 'desc'})
        .then(posts => {
            res.status(200).json({
                count: posts.length,
                posts: posts.map(post => {
                    return {
                        id: post._id,
                        title: post.title,
                        content: post.content,
                        slug: post.slug,
                        category: post.category,
                        photo: post.photo,
                        createdAt: post.createdAt,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:5000/posts/' + post._id
                        }
                    }
                })
            });
        }).catch(err => {
        console.error(err);
        res.status(500).json({error: err});
    });
}

exports.createNewPost = (req, res, next) => {
    const slug = req.body.title.trim().toLowerCase().replace(/\s+/g, '-') + '-' + Number(new Date());
    const {file} = req;
    const post = new Post({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        slug: slug,
        content: req.body.content,
        photo: file.filename,
        category: req.body.category,
        user: req.userData.id
    });
    post.save().then(po => {
        console.log(po);
        res.status(201).json({
            message: 'Post created successfully!',
            createdPost: {
                id: po._id,
                title: po.title,
                content: po.content,
                slug: po.slug,
                category: po.category,
                photo: po.photo,
                request: {
                    type: 'GET',
                    url: 'http://localhost:5000/posts/' + po._id
                }
            }
        });
    })
        .catch(err => {
            console.error(err);
            res.status(500).json({error: err});
        });
}

exports.retrievePostBySlug = (req, res, next) =>{
    const query = {
        slug: req.params.slug
    };
    Post.findOne(query)
        .populate('user', '_id firstName lastName')
        .then(post => {
            Comment.find({post: post._id})
                .populate('user', 'firstName lastName')
                .then(comments =>{
                    res.status(200).json({
                        id: post._id,
                        title: post.title,
                        content: post.content,
                        slug: post.slug,
                        category: post.category,
                        photo: post.photo,
                        createdAt: post.createdAt,
                        user: post.user,
                        comments: comments.map(comment => {
                            return {
                                id: comment._id,
                                user: comment.user,
                                content: comment.content
                            }
                        }),
                        request: {
                            type: 'GET',
                            url: 'http://localhost:5000/posts'
                        }
                    })
                })
        }).catch(err => {
        console.error(err);
        res.status(500).json({error: err});
    });
}

exports.retrieveAllPosts = (req, res, next) => {
    Post.find()
        .populate('user', '_id firstName lastName')
        .sort({createdAt: 'desc'})
        .then(posts => {
            res.status(200).json({
                count: posts.length,
                posts: posts.map(post => {
                    return {
                        id: post._id,
                        title: post.title,
                        content: post.content,
                        slug: post.slug,
                        category: post.category,
                        photo: post.photo,
                        createdAt: post.createdAt,
                        user: post.user,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:5000/posts/' + post._id
                        }
                    }
                })
            });
        }).catch(err => {
        console.error(err);
        res.status(500).json({error: err});
    });
}