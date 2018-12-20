const mongoose = require('mongoose');

/**
 * Create database scheme for Members
 */
const MemberScheme = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: String,
    email: {
        type: String,
        required: true
    },
    gender: String,
    phone: String,
    address: {
        street: String,
        city: String,
        state: String,
        zip: String
    },
    create_date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Member', MemberScheme);
