const mongoose = require('mongoose');

const hotelMenuSchema = mongoose.model({
    itemName : {type : String, required : true, max : 100},
    ofHotel : {type : mongoose.Schema.Types.ObjectId, ref : 'Hotel', required : true},
    itemCategory : {type : String, max : 100},
    itemPrice : {type : Number, required : true},
    itemAvail : {type : Boolean}
});

module.exports = mongoose.model('HotelMenu', hotelMenuSchema);