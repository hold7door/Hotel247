const mongoose = require('mongoose');
const Hotel = require('./hotel');

const roomSchema = mongoose.Schema({
    //roomNumber, available, suiteType set by manager dashboard
    roomNumber : {type : String},
    ofHotel : {type : mongoose.Schema.Types.ObjectId, ref : Hotel, required : true},
    available : {type : Boolean, default : true},
    suiteType : {type : String},
    //Below fields are set when a new guest is added
    bookDateTime : {type : Date},
    bookedUntil : {type : Number}    //A method required to convert this to actual dateTime. 
                                    //Different hotels have different check out times.
                                    //Now it is equal to durationOfStay     
});

module.exports = mongoose.model('Room', roomSchema);