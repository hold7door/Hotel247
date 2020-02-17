const mongoose = require('mongoose');
const BillGuest = require('billGuest');

const billSchema = mongoose.Schema({
    billId : {type : mongoose.Schema.Types.ObjectId, ref : BillGuest, required : true},
    menuItemId : {type : mongoose.Schema.Types.ObjectId, ref : HotelMenu, required : true},
    serviceItemId : {type : mongoose.Schema.Types.ObjectId, ref : hotelServices, required : true},
    menuItemQuant : {type : Number, required : true},
    serviceItemQuant : {type : Number, required : true},
    serviceItemAmount : {type : String},
    menuItemAmount : {type : String}
});

models.exports = mongoose.model('Bills', billSchema);