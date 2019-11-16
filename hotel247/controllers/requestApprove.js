const SignUpRequest = require('../models/signUpRequests');

module.exports = (router) => {
    router.get('/showall', (req, res) => {
        //Show all Pending Register Requests
        SignUpRequest.find({}, (err, data) => {
            if(err) throw err;
            res.render('pending', {allPending : data});
        });
    });

    router.approve('/hotel/:item', (req, res) => {
        var 
    });
};