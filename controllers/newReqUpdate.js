const SignUpRequest = require('../models/signUpRequests');

module.exports = (router) => {
    router.post('/', (req, res) => {
        var newRequest = new SignUpRequest({
            hotelName : req.body.HotelName, 
            hotelAddress : req.body.Address,
            hotelCity : req.body.City,
            hotelState : req.body.State,
            hotelPin : req.body.Pin,
            email : req.body.Email,
            certNumber : req.body.Cert
        });
        newRequest.save((err, data) => {
            if (err) throw err;
            res.json(data);
        });
    });
    return router;
};