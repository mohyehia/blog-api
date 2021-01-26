const mongoose = require('mongoose');
const PostSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: {
        type: String, required: true
    },
    content: {
        type: String, required: true
    },
    slug: {
        type: String, required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true
    }
});

module.exports = mongoose.model('Post', PostSchema);