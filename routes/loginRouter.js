
module.exports = (router, passport) => {
    router.post('/login', passport.authenticate('local'), (req, res) => {
        var userInfo = {
            username : req.user.userId
        };
        res.json(userInfo);
    });
    return router;
};
 