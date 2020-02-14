const SignUpRequest = require('../models/signUpRequests');
const Hotel = require('../models/hotel');
const HotelManager = require('../models/hotelManager');
const mongoose = require('mongoose');
const crypto = require('crypto');

module.exports = (router) => {
    router.get('/showall', (req, res) => {
        //Show all Pending Register Requests
        SignUpRequest.find({}, (err, data) => {
            if(err) throw err;
            //res.json(data);
            res.render('showAllRequest', {data : data});
        });
    });

    router.get('/hotel/:item', (req, res) => {
        console.log(req.params.item);
        var searchId = mongoose.Types.ObjectId(req.params.item);
        var regItem = SignUpRequest.findById(searchId, (err, searchRes) => {
            if (err) throw err;
            var newHotel = new Hotel({
                hotelName : searchRes.hotelName,
                hotelAddress : searchRes.hotelAddress,
                hotelCity : searchRes.hotelCity,
                hotelState : searchRes.hotelState,
                hotelPin : searchRes.hotelPin
            });
            newHotel.save((err, data) => {
                if (err) throw err;
                var newManager = new HotelManager({managerOfHotel : data.id});
                newManager.userId = searchRes.email;
                newManager.save((err, manData) => {
                    if (err) throw err;
                    regItem.deleteOne((err, data) => {
                        if (err) throw err;
                    });
                });
                randomInitPassword = crypto.randomBytes(4).toString('hex');
                newManager.setPassword(randomInitPassword, (err, data) => {
                    if (err) throw err;
                });
                console.log("Manager created successfully. Credentials sent to user");
                //Write Email logic
            });
            res.json(searchRes);
        });
    });
    return router;
};