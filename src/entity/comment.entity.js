const mongoose = require('mongoose');
const CommentSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    content: {
        type: String, required: true
    },
    post: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true
    }
});

module.exports = mongoose.model('Comment', CommentSchema);