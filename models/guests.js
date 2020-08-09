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
    guestRoomNumber : {type : mongoose.Schema.Types.ObjectId, ref : 'Room'},
    ofHotel : {type : mongoose.Schema.Types.ObjectId, ref : 'Hotel'},
    billId : {type : mongoose.Schema.Types.ObjectId, ref : 'BillGuest'},
    email : {type : String},
    zipCode : {type : String},
    suite : {type : String}
});

module.exports = mongoose.model('Guests', guestSchema);
