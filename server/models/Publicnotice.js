const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    class: {
        type: String
    },
    notice: {
        type: String
    },
})

module.exports = mongoose.model('Publicnotice', schema)