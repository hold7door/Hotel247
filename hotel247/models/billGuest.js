const mongoose = require('mongoose');
const Guests = require('guests');

const BillGuestSchema = mongoose.Schema({
    ofGuest : {type : mongoose.Schema.Types.ObjectId, ref : Guests, required : true},
    paid : {type : false, required : true},
    currentAmount : {type : String, required : true}
});

module.exports = mongoose.model('BillGuest', BillGuestSchema);
