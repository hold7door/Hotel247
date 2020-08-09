const mongoose = require('mongoose');
const Hotel = require('./hotel');

const ServiceCategorySchema = mongoose.Schema({
	categoryName : {type : String, required : true},
	ofHotel : {type : mongoose.Schema.Types.ObjectId, ref : 'Hotel', required : true}
});

module.exports = mongoose.model('ServiceCategory', ServiceCategorySchema);