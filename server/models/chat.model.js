const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatSchema = new Schema({
    chatId: {
        type: String,
        required: true
    },
    chatType: {
        type: String,
        required: true
    },
    chatpic: {
        type: String
    },
    participants: {
        type: Array,
        required: true
    },
    thread:{
        type: Array
    }
},{
    timestamps: true
})

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;