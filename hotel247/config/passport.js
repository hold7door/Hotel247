const HotelManager = require('../models/hotelManager');

module.exports = (passport, localStrategy) => { 
    passport.use(new localStrategy(
        function (username, password, done){
            HotelManager.findOne({userId : username}, function(err, user){
                if (err) return done(err);
                if (!user){
                    return done(null, false, {message : 'Username does not exist.'});
                }
                if (!user.validatePassword(password)){
                    return done(null, false, {message : 'Incorrect Password.'});
                }
                return done(null, user);
            });
        }
    ));

    passport.serializeUser(function(user, done){
        console.log('serializing ' + user.id);
        done(null, user.id);
    });
    passport.deserializeUser(function(id, done){
        console.log('deserializing ' + id);
        HotelManager.findById(id, function(err, user){
            if (err) return done(err);
            done(err, user);
        });
    });
};