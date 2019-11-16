const mongoose = require('mongoose');

const signupRequestSchema = mongoose.Schema({
    hotelName : {type : String, required : true, max : 150}, 
    hotelAddress : {type : String, required : true, max : 300},
    hotelCity : {type : String, required : true, max : 50},
    hotelState : {type : String, required : true, max : 50},
    hotelPin : {type : Number},
    certNumber : {type : String, required : true, max : 100}
});

module.exports = mongoose.model('SignUpRequest', signupRequestSchema);