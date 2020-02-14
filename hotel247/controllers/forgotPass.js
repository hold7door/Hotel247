const HotelManager = require('../models/hotelManager');
const mongoose = require('mongoose');
const crypto = require('crypto');

module.exports = (router) => {
    router.get('/:item', (req, res) => {
        HotelManager.findOne({ userId : req.params.item }, (err, data) => {
            if (err) {
                throw err;
            }
            else{
                if (data){
                    newPassString = crypto.randomBytes(4).toString('hex');
                    data.setPassword(newPassString, (err, data) => {
                        if (err) throw err;
                    });
                    data.save();
                    console.log("New Credentials sent to user.");
                    res.json({forgot : true});
                }
                else{
                    res.json({ invalid : true });
                    console.log("Invalid email address. Not Found");
                }
            }
        });
    });
    return router;
}

