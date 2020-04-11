//Dotenv that loads environmental varibles from a .env file into process.env
const dotenv = require('dotenv');
const result = dotenv.config();
if (result.error) {
  throw result.error;
}

//All required packages
const express = require('express');
const router = express.Router();
const passport = require('passport');
const session = require('express-session');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const localStrategy = require('passport-local').Strategy;
const cors = require('cors');
const socket = require('socket.io');

//Store session information in MongoDb database for persistance
var Store = require('express-session').Store;
var MongooseStore = require('mongoose-express-session')(Store);

//Mongoose Setup
// MongoDb credentials stores in separate .env file
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

//Setup express app 
const app = express();
//Set View engine
app.set('view engine', 'ejs');
//App middlewares
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
//[Todo] Determine use of cors
app.use(cors()); // plumbing it in as middleware


//Api endpoint specific different files
//Login/logout routes
const loginRoutes = require('./routes/loginRouter')(router, passport);
//When a new hotel submits a request. Provides Verification, Acceptance or Rejection of new requests.
const pendingRequest = require('./controllers/requestApprove')(router); // View and Accept
const newReq = require('./controllers/newReqUpdate')(router);           //Update request

//When user forgets password
const forgotPass = require('./controllers/forgotPass')(router);

//Different endpoints to process Hotel Data
const hotelData = require('./controllers/hotelData')(router);
const roomInfo = require('./controllers/roomInfo')(router);

// User log-in session using passport
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

//All endpoints 
app.use('/auth', loginRoutes);
app.use('/approve', pendingRequest);
app.use('/newreq', newReq);
app.use('/forgot', forgotPass);
//api endpoint for hotel specific dashboard data read and write
app.use('/api', hotelData);
app.use('/roominfo', roomInfo);

const port = 4500;
var server = app.listen(port);
console.log(`API Server listening on port ${port}`);

//Socket.io events for Chat
var io = socket(server);
io.on('connection', function(sock){
    console.log("Guest/Manager connected");
    sock.on('joinManager', function(data){
        sock.join(data.hotel);
        console.log("Manager joined room " + data.hotel + " (Hotel Id)");
    });
    sock.on('joinGuest', function(data){
        //Guest in chat is identified by hotelID + room number
        var guestRoom = data.hotelId + data.room;
        //console.log(guestRoom);
        sock.join(guestRoom);
        console.log("Guest joined. Room : " + data.room + " HotelId : " + data.hotelId);
    });
    sock.on('sendToManager', function(data){
        io.sockets.in(data.hotelId).emit('sendGuestQuery', {message : data.message, from  : data.roomNum, room : data.roomNum});
    });
    sock.on('managerSendsReply', function(data){
        console.log("Manager sends reply to " + data.to);
        io.sockets.in(data.to).emit('receive', {message : data.message, from : data.from, room : data.room});
    });
});