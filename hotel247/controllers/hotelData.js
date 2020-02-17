const mongoose = require('mongoose');
const Hotel = require('../models/hotel');

module.exports = (router) => {
    router.get('/getHotelName/:id', (req, res) => {
        Hotel.findById(req.params.id, (err, data)=>{
            if (err) {
                res.json({hotelName : null});
            }
            else{
                res.json({hotelName : data.hotelName});
            }
        });
    });
    return router;
};