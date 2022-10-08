const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: {
        type: String
    },
    health: {
        type: String
    },
    location: {
        type: String
    }
})

module.exports = mongoose.model('Device', schema)