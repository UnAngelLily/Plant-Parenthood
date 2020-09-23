const express = require('express')
const Plant = require('../models/plant.js')
const router = express.Router()

//_______________
//authentication
//_______________
const isAuthenticated = (req, res, next) => {
  if (req.session.currentUser) {
    return next()
  } else {
    res.redirect('/sessions/new')
  }
}

//___________________
// new.ejs
// __________________
router.get('/new', (req, res) => {
  // Plant.findById(req.params.id, (error, foundPlant) => {
    res.render(
      'plant/new.ejs',
      {
        // plant:foundPlant,
        currentUser:req.session.currentUser
      })
  })
// })
//________________
//show.ejs
//________________
router.get('/:id', (req, res) => {
  if(req.session.currentUser) {
  Plant.findById(req.params.id, (error, foundPlant) => {
    res.render(
      'plant/show.ejs', {
        plant:foundPlant,
        currentUser: req.session.currentUser
      })
  })
} else {
    res.redirect('/sessions/new')
    }
})

//___________________
// edit.ejs
// __________________
router.get('/:id/edit', (req, res) => {
  Plant.findById(req.params.id, (error, foundPlant) => {
    res.render(
      'plant/edit.ejs',
      {
        plant:foundPlant,
        currentUser: req.session.currentUser
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
        currentUser: req.session.currentUser
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

// _________________
// seed route
// ________________
// router.get('/set/seed', (req, res) => {
//   plant.create(plantSeed, (err, data) => {
//     if(err)console.log(err.message)
//     console.log('planting seeds')
//   })
// })
// router.get('/setup/seed', (req, res) => {
//   Plant.create(
//     [
//      { // seed ============================================================
//        name: "Haworthia",
//        botanicalname: "Haworthia Obtusa",
//        familyname: "Asphodelaceae Asphodeloideae",
//
//        currentimage:"https://i.imgur.com/ZMcaWCo.png",
//
//        origin: "South Africa (Eastern Cape)",
//        expectedgrowth: "3in x 6in",
//        leafshape: "Rosette",
//        color: "Green with transparent window-like petals",
//        bloom: (plant.bloom === true),
//        bloomigseason: "summer monocot-blooms multiple times white",
//
//        soiltype: "Quick draining mixtures such as  porours pumice, aquarium gravel, or perlite. Avoid sand mixed soil as it clogs up pores",
//        humidity: "low under 40%",
//        temperature: "85-60F",
//        light: "low indoor light or filtered/partial sun, 100-1000 Lux",
//        water: "Deep infrequent watering with soil is bone dry. Plant is dormant in the winter and therefore requires less watering",
//        pottype: "terracotta",
//        repotting: "every 2-3 years",
//        propgation: "When new offsets grow from clumps around the base they can be left to develeop into a dense clump or pulled off and transplanted",
//        commonissues: "Root rot fron overwatering and sunburns from too much light",
//
//        dateacquired: "January 25th 2019",
//        storeacquired: "Denver Colorado - Nursery",
//        firstimage: "https://i.imgur.com/yrWy3Vh.jpg",
//
//        lastwatered: "August 19th 2020",
//        lastrepotting: "July 2020",
//        entrydate: "September 20th 2020",
//        updateimage: "https://i.imgur.com/eSLz7BO.jpg",
//        entry: "Plant appears to be doing well. Offsets  are in a container next to the original plant. Due to it\'s stretch the mother plant is being held up with assistance by being tied to a stick to hoist it up. Plant tends to bow when unassisted. There still appears to be a nat problem with the plant as it may have root rot from overwatering so a moisture meter will determine when the soil is dry enough for it\'s next water cycle.",
//      }
//    ],
//      (error, data) => {
//        res.redirect("/plant");
//      })
//    })



//________________
//drop database route
//________________
// router.get(
//   '/nogoingback/killitdead/nomoreplants/overwateredthem/underwateredthem/blackthumb',
//   (req, res) => {
//     Plant.collection.drop()
//     res.send('There\'s a difference between planted and buried')
//   }
// )

module.exports = router
