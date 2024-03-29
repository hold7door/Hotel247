const dotenv = require('dotenv').config();
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
var db_user = process.env.DB_USER;
var db_pass = process.env.DB_PASS;
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

app.use(cors()); // plumbing it in as middleware

const loginRoutes = require('./routes/loginRouter')(router, passport);

require('./config/passport')(passport, localStrategy);

app.get('/isAuth', (req, res, next) => {
    console.log(req.sessionID);
    if (req.user)
        res.json({ user : req.user });
    else{ 
        res.json({ user : null });
    }
});

app.use('/auth', loginRoutes);


const port = 4500;
app.listen(port);
console.log(`Server listening on port ${port}`);