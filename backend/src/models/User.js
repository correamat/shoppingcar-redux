const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String
    },
    login: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        default: true
    }
}, {
    timestamp: true
});

module.exports = mongoose.model('User', UserSchema);