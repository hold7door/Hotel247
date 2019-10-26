const mongoose = require('mongoose');

const roomSchema = mongoose.Schema({
    roomNumber : {type : Number},
    ofHotel : {type : mongoose.Schema.Types.ObjectId, ref : Hotel, required : true},
    available : {type : Boolean},
    bookedFrom : {type : Date},
    bookedUntil : {type : Date}
});

models.exports = mongoose.model('Room', roomSchema);