const dotenv = require('dotenv');
const result = dotenv.config();
if (result.error) {
  throw result.error;
}

const express = require('express');
const router = express.Router();
const passport = require('passport');
const session = require('express-session');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const localStrategy = require('passport-local').Strategy;
const cors = require('cors');
var Store = require('express-session').Store;
var MongooseStore = require('mongoose-express-session')(Store);
const db_user = process.env.DB_USER;
const db_pass = process.env.DB_PASS;
mongoose.connect(`mongodb+srv://${db_user}:${db_pass}@cluster0-wfqgi.mongodb.net/test?retryWrites=true&w=majority`, 
    {useNewUrlParser : true, useUnifiedTopology : true}
);

/* const HotelManager = require('./models/hotelManager');
const f = new HotelManager({userId : 'hello'});
f.setPassword('world');
f.save((err, f) => {
    if (err) console.log('Error in save');
}); */

const app = express();
app.set('view engine', 'ejs');
app.use(session({secret : 'cats', 
    resave : false, saveUninitialized : false, 
    store: new MongooseStore({
        /* configuration */
        connection : mongoose
    })
}));

app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static('./public'));

app.use(cors()); // plumbing it in as middleware

const loginRoutes = require('./routes/loginRouter')(router, passport);
const pendingRequest = require('./controllers/requestApprove')(router);
const newReq = require('./controllers/newReqUpdate')(router);
const forgotPass = require('./controllers/forgotPass')(router);
const hotelData = require('./controllers/hotelData')(router);

require('./config/passport')(passport, localStrategy);

app.get('/isAuth', (req, res, next) => {
    //console.log(req.sessionID);
    if (req.user)
        res.json({ user : req.user });
    else{ 
        res.json({ user : null });
    }
});

app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});

app.use('/auth', loginRoutes);
app.use('/approve', pendingRequest);
app.use('/newreq', newReq);
app.use('/forgot', forgotPass);

//api endpoint for hotel specific dashboard data read and write
app.use('/api', hotelData);

const port = 4500;
app.listen(port);
console.log(`API Server listening on port ${port}`);