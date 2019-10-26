const mongoose = require('mongoose');

const hotelServicesSchema = mongoose.Schema({
    serviceName : {type : String, required : true, max : 100},
    ofHotel : {type : mongoose.Schema.Types.ObjectId, ref : Hotel, required : true},
    serviceCategory : {type : String, max : 100},
    servicePrice : {type : Number, required : true},
    serviceAvail : {type : Boolean}
});

models.exports = mongoose.model('HotelServices', hotelServicesSchema);