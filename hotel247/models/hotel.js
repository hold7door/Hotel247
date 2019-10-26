const mongoose = require('mongoose');

const hotelSchema = mongoose.Schema({
    hotelName : {type : String, required : true, max : 150}, 
    hotelAddress : {type : String, required : true, max : 300},
    hotelCity : {type : String, required : true, max : 50},
    hotelState : {type : String, required : true, max : 50},
    hotelPin : {type : Number},
});

module.exports = mongoose.model('Hotel', hotelSchema);