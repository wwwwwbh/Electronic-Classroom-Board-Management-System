const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: {
        type: String
    },
    info: {
        type: String
    },
    time: {
        type: String
    },
    status: {
        type: String
    },
    operator: {
        type: String
    },
})

module.exports = mongoose.model('Repair', schema)