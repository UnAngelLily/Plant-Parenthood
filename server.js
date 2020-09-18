//___________________
//Dependencies
//___________________
const express = require('express'); //access to express library
const session = require('express-session');
const methodOverride  = require('method-override');
const mongoose = require ('mongoose');
const app = express ();
const db = mongoose.connection;
require('dotenv').config()

//___________________
//Configuration
//___________________
const app = express();
const db=mongoose.connectio
const PORT = process.env.PORT || 3003; //control of the PORT, 3003 is the fall back PORT // Allow use of Heroku's port or your own local port, depending on the environment

//___________________
//Middleware
//___________________
app.use(methodOverride('_method'));
app.use(express.urlencoded({extended:true}))
//use public folder for static assets
app.use(express.urlencoded({ extended: false }));// extended: false - does not allow nested objects in query strings, get's data forms as objects - access to key value pairs i req.body
app.use(express.static('public')); //serve up static files like css, put the items in folder called public
app.use(session({ //login and crypt the session
  secret: process.env.SECRET,
  resave:false,
  saveUninitalized: false
  })
)


//___________________
//Database
//___________________
// How to connect to the database either via heroku or locally
const MONGODB_URI = process.env.MONGODB_URI; // this should match the .env file

// Connect to Mongo &
// Fix Depreciation Warnings from Mongoose
// May or may not need these depending on your Mongoose version
mongoose.connect(MONGODB_URI , { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

// Error / success boilerplate
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));

//___________________
//Middleware
//___________________



// populates req.body with parsed info from forms - if no data from forms will return an empty object {}

app.use(express.json());// returns middleware that only parses JSON - may or may not need it depending on your project

//use method override
app.use(methodOverride('_method'));// allow POST, PUT and DELETE from a form, allows us to delete (DELETE), update(PUT)

//___________________
// Routes
//___________________
//localhost:3000
app.get('/' , (req, res) => {
  res.send('Hello World!');
});

//___________________
//Listener
//___________________
app.listen(PORT, () => console.log( 'Listening on port:', PORT));
