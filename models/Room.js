const mongoose = require('mongoose');
const Hotel = require('./hotel');

const roomSchema = mongoose.Schema({
    //roomNumber, available, suiteType set by manager dashboard
    roomNumber : {type : String},
    ofHotel : {type : mongoose.Schema.Types.ObjectId, ref : 'Hotel'},
    available : {type : Boolean, default : true},
    suiteType : {type : String},
    //Below fields are set when a new guest is added
    bookDateTime : {type : Date},
});

module.exports = mongoose.model('Room', roomSchema);