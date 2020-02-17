const mongoose = require('mongoose');
const Hotel = require('hotel');

const roomSchema = mongoose.Schema({
    roomNumber : {type : Number},
    ofHotel : {type : mongoose.Schema.Types.ObjectId, ref : Hotel, required : true},
    available : {type : Boolean},
    suiteType : {type : String},
    bookDate : {type : Date},
    bookTime : {type : String},
    bookedUntil : {type : Date}
});

models.exports = mongoose.model('Room', roomSchema);