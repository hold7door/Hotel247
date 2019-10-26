const mongoose = require('mongoose');

const customerSchema = mongoose.Schema({
    customerName : {type : String, required : true, max : 150},
    customerRoom : {type : mongoose.Schema.Types.ObjectId, ref : Room, required : true},
    fromDate : {type : Date, required : true},
    toDate : {type : Date, required : true},
    totalBill : {type : String, required : true},
    billNumber : {type : mongoose.Schema.Types.ObjectId, ref : Bills, required : true}
});

models.exports = mongoose.model('Customer', customerSchema);
