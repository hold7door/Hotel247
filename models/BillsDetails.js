const mongoose = require('mongoose');
//const BillGuest = require('billGuest');

//Document created only when guests orders something
const billSchema = mongoose.Schema({
    billId : {type : mongoose.Schema.Types.ObjectId, ref : 'BillGuest', required : true},
    menuItemId : {type : mongoose.Schema.Types.ObjectId, ref : 'HotelMenu', required : true},
    serviceItemId : {type : mongoose.Schema.Types.ObjectId, ref : 'HotelServices', required : true},
    menuItemQuant : {type : Number, required : true},
    serviceItemQuant : {type : Number, required : true},
    serviceItemAmount : {type : String},
    menuItemAmount : {type : String}
});

module.exports = mongoose.model('Bills', billSchema);