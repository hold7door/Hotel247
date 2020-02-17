const mongoose = require('mongoose');
const Hotel = require('./hotel');

const roomSchema = mongoose.Schema({
    roomNumber : {type : String},
    ofHotel : {type : mongoose.Schema.Types.ObjectId, ref : Hotel, required : true},
    available : {type : Boolean, default : true},
    suiteType : {type : String},
    bookDateTime : {type : Date},
    bookedUntil : {type : Number}    //A method required to convert this to actual dateTime. 
                                    //Different hotels have different check out times.
                                    //Now it is equal to durationOfStay     
});

module.exports = mongoose.model('Room', roomSchema);