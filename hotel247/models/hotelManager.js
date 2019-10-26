const mongoose = require('mongoose');
const crypto = require('crypto');

const managerSchema = mongoose.Schema({
    userId : {type : String},
    hash : {type : String},
    salt : {type : String}
});

managerSchema.methods.setPassword = function(password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    console.log("set hash to " + this.hash);
};

managerSchema.methods.validatePassword = function(password) {
    const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    return (hash == this.hash);
};

module.exports = mongoose.model('HotelManager', managerSchema);