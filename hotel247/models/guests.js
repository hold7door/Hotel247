const mongoose = require('mongoose');
const BillGuest = require('billGuest');
const Room = require('Room');
const Hotel = require('hotel');

const guestSchema = mongoose.Schema({
    guestFirstName : {type : String, required : true, max : 150},
    guestLastName : {type : String, required : true, max : 150},
    guestIdType : {type : String, required : True},
    guestIdNumber : {type : String, required : True},
    checkInDate : {type : Date, required : true},
    checkInTime : {type : Date, required : true},
    durationOfStay : {type : String},
    guestRoomNumber : {type : mongoose.Schema.Types.ObjectId, ref : Room, required : true},
    ofHotel : {type : mongoose.Schema.Types.ObjectId, ref : Hotel, required : true},
    billId : {type : mongoose.Schema.Types.ObjectId, ref : BillGuest, required : true}
});

models.exports = mongoose.model('Guest', guestSchema);
