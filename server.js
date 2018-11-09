const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const links = require('./routes/api/links');
const short = require('./routes/short');
const expressHbs = require('express-handlebars');
const session = require('express-session');
const flash = require('connect-flash');
//mongo db
const db = require('./config/keys').mongoURI;

const app = express();

//handlebars
app.engine('.hbs', expressHbs({defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', 'hbs');

//body-parser middleware
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


//express session middleware
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
}));

//express messages middleware
app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

//connect flash middleware
app.use(flash());

//connect to mongo
mongoose
    .connect(db, { useNewUrlParser: true })
    .then(()=>console.log("MongoDB connected.."))
    .catch(err => console.log(err));

//routes
app.use('/api', links);
app.use('/', short);

const port = 1337;
app.listen(port, ()=>console.log(`Server started running on port ${port}`));