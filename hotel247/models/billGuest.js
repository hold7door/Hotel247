const mongoose = require('mongoose');
const Guest = require('./guests');

const BillGuestSchema = mongoose.Schema({
    billOfGuest : {type : mongoose.Schema.Types.ObjectId},
    paid : {type : Boolean, default : false},
    currentAmount : {type : Number, dafault : 0}
});

module.exports = mongoose.model('BillGuest', BillGuestSchema);
