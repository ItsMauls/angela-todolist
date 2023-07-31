
const mongoose = require ('mongoose')
const Items = require('../models/items')

const itemsSchema = {
    title: String
  };

const customSchema = new mongoose.Schema({
    name : String,
    items : [itemsSchema]
})
const customList = mongoose.model('customList', customSchema)

module.exports = customList