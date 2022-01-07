const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    uid: {
        type: String,
        required: true
    },
    about: {
        type: String,
    },
    profilepic: {
        type: String,
    },
    connects: {
        type: Array,
    },
    conversations: {
        type: Array,
    }
},{
    timestamps: true
})

const User = mongoose.model('User', userSchema);

module.exports = User;