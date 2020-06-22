const mongoose = require('mongoose');
const Hotel = require('./hotel');
const ServiceCategory = require('./ServiceCategory');

const ServiceSubCategorySchema = mongoose.Schema({
	subCategoryName : {type : String, required : true},
	categoryName : {type : String},
	ofHotel : {type : mongoose.Schema.Types.ObjectId, ref : 'Hotel', required : true}
});

module.exports = mongoose.model('ServiceSubCategory', ServiceSubCategorySchema);