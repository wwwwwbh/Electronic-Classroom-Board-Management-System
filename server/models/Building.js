const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: {
        type: String
    },
    number: {
        type: String
    },
    floor: {
        type: Number
    }
})

module.exports = mongoose.model('Building', schema)