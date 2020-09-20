const express = require('express')
const Plant = require('../models/plant.js')
const router = express.Router()

//___________________
// new.ejs
// __________________
router.get('/new', (req, res) => {
  Plant.findById(req.params.id, (error, foundPlant) => {
    res.render(
      'plant/new.ejs',
      {
        plant:foundPlant,
        // currentUser:req.session.currentUser
      })
  })
})
//________________
//show.ejs
//________________
router.get('/:id', (req, res) => {
  // if(req.session.currentUser) {
  Plant.findById(req.params.id, (error, foundPlant) => {
    res.render(
      'plant/show.ejs', {
        plant:foundPlant,
        // currentUser: req.session.currentUser
      })
  })
// } else {
    // res.redirect('/session/new')
    }
  // }
)

//___________________
// edit.ejs
// __________________
router.get('/:id/edit', (req, res) => {
  Plant.findById(req.params.id, (error, foundPlant) => {
    res.render(
      'plant/edit.ejs',
      {
        plant:foundPlant,
        // currentUser: req.session.currentUser
      })
  })
})

//__________________
// index route
// _________________
router.get('/', (req, res) => {
  Plant.find({}, (err, allPlant) => {
    res.render(
      'plant/index.ejs',
      {
        plant:allPlant,
        // currentUser: req.session.currentUser
      })
  })
})

// __________________
// create route
// __________________
router.post('/', (req, res) => {
  if (req.body.bloom === 'on') {
    req.body.bloom = true;
  } else {
    req.body.bloom = false;
  }
  Plant.create(req.body, (error, createdPlant) => {
    res.redirect('/plant')
  })
})

// __________________
// put route
// __________________
router.put('/:id', (req, res) => {
  if (req.body.bloom === 'on') {
    req.body.bloom = true;
  } else {
    req.body.bloom = false;
  }
  Plant.findByIdAndUpdate(
    req.params.id,
    req.body,
    {new:true},
    (err, updateModel) => {
      res.redirect('/plant')

    })
})

//___________________
// delete route
// __________________
router.delete('/:id', (req, res) => {
  Plant.findByIdAndRemove(req.params.id, (err, data) => {
    res.redirect('/plant')
  })
})

//_________________
// seed route
// ________________
router.get('/set/seed', (req, res) => {
  plant.create(
    [
  //insert seeds here
    ]
  )
})

//________________
//drop database route
//________________
// router.get(
//   '/nogoingback/killitdead/nomoreplants',
//   (req, res) => {
//     Plant.collection.drop()
//     res.send('There\'s a difference between planted and buried')
//   }
// )

module.exports = router
