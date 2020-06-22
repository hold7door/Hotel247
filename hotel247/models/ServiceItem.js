const mongoose = require('mongoose');
const Hotel = require('./hotel');

const ServiceItemSchema = mongoose.Schema({
	itemName : {type : String, required : true},
	price : {type : Number, required : true},
	categoryName : {type : String, required : true},
	subCategoryName : {type : String, required : true},
	ofHotel : {type : mongoose.Schema.Types.ObjectId, ref : 'Hotel', required : true}
});

module.exports = mongoose.model('ServiceItem', ServiceItemSchema);