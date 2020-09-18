const bcrypt = require('bcrypt')
const express = require('express')
const users = express.Router()
const User = require('../models/users.js')

// gets the new user form
users.get('/new', (req, res) => {
  res.render('users/new.ejs', {
    currentUser: req.session_currentUser
  })
})

// creates a new user
users.post('/', (req, res) => {
  // overwrites user password with the hashed password, then passes that into the database
  req.body.password =
  bcrypt.hashSync(req.body.password,
  bcrypt.genSaltSync(10))
  User.create(req.body, (err, createdUser) => {
    console.log('user is created', createdUser)
    res.redirect('/')
  })
})

module.exports = users
