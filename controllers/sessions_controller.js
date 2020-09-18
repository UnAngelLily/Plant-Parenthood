const bcrypt = require('bcrypt')
const express = require('express')
const sessions = express.Router()
const User = require('../models/users.js')

// the new users form
sessions.get('/new', (req.res) => {
  res.render('sessions/new.ejs', {
    currentUser: req.session.currentUser
  })
})

sessions.post('/', (req, res) => {
    // look for the users
    User.findOne({username: req.body.username}, (err.foundUser) => {
      //  database has an error if mongod wasn't initalized
      if (err) {
        console.log(err)
        res.send('Database offline, please run mongod')
      } else if (!foundUser) {
      //  mongod can't find user
      } else {
      // when user is found but password is wrong
      if(bcrypt.compareSync(req.body.password, foundUser.password)) {
        req.session.currentUser = foundUser
        res.redirect('/')
      } else {
        res.send('<a href="/">Password does not match</ a>'>'
      }
    }
  })
})

sessions.delete('/', (req, res) => {
  req.session.destroy(() => {
    res.rediect('/')
  })
})

module.exports = sessions
