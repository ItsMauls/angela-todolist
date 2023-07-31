const { Schema } = require('mongoose')
const mongoose = require ('mongoose')

const itemsSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    }
})
const Items = mongoose.model('Items', itemsSchema)

module.exports = Items