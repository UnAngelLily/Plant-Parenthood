//___________________
//Dependencies
//___________________
const express = require('express') //access to express library
const session = require('express-session')
const methodOverride  = require('method-override')
const mongoose = require('mongoose')
require('dotenv').config()

//__________________
//Configuration
//__________________
const app = express()
const db = mongoose.connection
const PORT = process.env.PORT || 3003; // control of the PORT, 3003 is the fall back PORT // Allow use of Heroku's port or your own local port, depending on the environment
const mongodbURI = process.env.MONGODBURI
//__________________
//Middleware
//__________________
app.use(methodOverride('_method'))
app.use(express.urlencoded({extended:true}))
// use public folder for static assets
// app.use(express.json());// returns middleware that only parses JSON - may or may not need it depending on your project
app.use(express.static('public')) //serve up static files like css, put the items in folder called public
// app.use(session({ // login and crypt the session
//   secret: 'process.env.SECRET',
//   resave: false,
//   saveUninitalized: false
//   })
// )
// app.use(express.cookieParser('secret'));
// app.use(express.cookieSession());
//https://stackoverflow.com/questions/18617091/secret-option-required-for-app-useexpress-cookiesession
//thought this would fix the "ERROR secret option required for app.use" but it didn't.

//__________________
//Database
//__________________
// How to connect to the database either via heroku or locally
const MONGODB_URI = process.env.MONGODB_URI; // this should match the .env file
// Connect to Mongo &
// Fix Depreciation Warnings from Mongoose
// May or may not need these depending on your Mongoose version
mongoose.connect(MONGODB_URI ,
   {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    },
    () => {
      console.log('mongod connection established')
    }
)
// Error / success boilerplate
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));

//__________________
// Controllers
//__________________
//Routes located in Controllers directory
const plantController = require('./controllers/plant_controller.js')
app.use('/plant', plantController)
// const sessionsController = require('./controllers/sessions_controller.js')
// app.use('/sessions', sessionsController)
// const usersController = require('./controllers/users_controller.js')
// app.use('/users', usersController)

//Route to redirect user
app.get('/' , (req, res) => {
  res.redirect('/plant')
})

//seed to db
// Log.create(logSeed, (err, data) => {
//   if (err) console.log(err.message)
//   console.log('added provided product data')
// })

//__________________
//Listener
//__________________
app.listen(PORT, () => console.log( 'Listening on port:', PORT));
