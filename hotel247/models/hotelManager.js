const mongoose = require('mongoose');
const crypto = require('crypto');
const Hotel = require('./hotel');

const managerSchema = mongoose.Schema({
    managerOfHotel : {type : mongoose.Schema.Types.ObjectId, ref : 'Hotel', required : true},
    userId : {type : String},
    hash : {type : String},
    salt : {type : String},
    firstPass : {type : String}
});

managerSchema.methods.setPassword = function(password) {
    this.firstPass = password;
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

managerSchema.methods.validatePassword = function(password) {
    const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    return (hash == this.hash);
};

module.exports = mongoose.model('HotelManager', managerSchema);