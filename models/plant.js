const mongoose = require('mongoose')

const plantSchema = new mongoose.Schema(
  {
    name: { type:String, required: true},
    botanicalname: { type:String, required: false},
    familyname: { type:String, required: false},

    currentimage: { type:String, required: false},

    origin: { type:String, required: true},
    expectedgrowth: { type:String, required: false},
    leafshape: { type:String, required: true},
    color: { type:String, required: true},
    bloom: Boolean,
    bloomingseason: { type:String, required: false},

    soiltype: { type:String, required: true},
    humidity: { type:String, required: false},
    temperature: { type:String, required: true},
    light: { type:String, required: true},
    water: { type:String, required: true},
    pottype: { type:String, required: false},
    repotting: { type:String, required: false},
    propagation: { type:String, required: false},
    commonissues: { type:String, required: false},

    dateacquired: { type:String, required: true},
    storeacquired: { type:String, required: true},
    firstimage: { type:String, required: true},

    lastwatered: { type:String, required: true},
    lastrepotting: { type:String, required: true},
    entrydate: { type:String, required:true},
    updateimage: { type:String, required: true},
    entry: { type:String, required: true}

  })

const Plant = mongoose.model('Plant', plantSchema)

module.exports = Plant
