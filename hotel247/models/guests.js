const mongoose = require('mongoose');
const BillGuest = require('./billGuest');
const Room = require('./Room');
const Hotel = require('./hotel');

const guestSchema = mongoose.Schema({
    guestFirstName : {type : String, required : true, max : 150},
    guestLastName : {type : String, required : true, max : 150},
    guestIdType : {type : String, required : true},
    guestIdNumber : {type : String, required : true},
    contactNumber : {type : String, required : true},
    city : {type : String, required : true},
    country : {type : String, required : true},
    address : {type : String, required : true},
    checkInDateTime : {type :Date},
    durationOfStay : {type : String},
    guestRoomNumber : {type : mongoose.Schema.Types.ObjectId, ref : Room, required : true},
    ofHotel : {type : mongoose.Schema.Types.ObjectId, ref : Hotel, required : true},
    billId : {type : mongoose.Schema.Types.ObjectId, ref : BillGuest}
});

module.exports = mongoose.model('Guests', guestSchema);
