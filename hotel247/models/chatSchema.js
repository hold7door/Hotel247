const mongoose = require('mongoose');

const ChatSchema = mongoose.Schema({
    message : {type : String},
    from : {type : String},
    to : {type : String}
});

module.exports = mongoose.model('Chats', ChatSchema);