const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    username: {
        type: String
    },
    name: {
        type: String
    },
    path: {
        type: String
    },
})

module.exports = mongoose.model('Repair', schema)