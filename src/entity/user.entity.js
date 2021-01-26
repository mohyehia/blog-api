const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String, required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        index: true,
        match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    },
    firstName: {
        type: String, required: true
    },
    lastName: {
        type: String, required: true
    },
    address: {
        type: String, required: false
    },
    job: {
        type: String, required: false
    },
    mobile: {
        type: String, required: false
    },
    phone: {
        type: String, required: false
    },
    password: {
        type: String, required: true
    },
    joined: {
        type: Date, default: new Date()
    }
});

module.exports = mongoose.model('User', userSchema);