const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    college: {
        type: String
    },
    name: {
        type: String
    },
    weekday: {
        type: String
    },
    time: {
        type: String
    },
    classroom: {
        type: String
    },
    teacher: {
        type: String
    },
    year: {
        type: String
    },
    startweek: {
        type: Number
    },
    endweek: {
        type: Number
    }
})

module.exports = mongoose.model('Course', schema)