const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    coursename:{
        type: String
    },
    coursedetail: {
        type: String
    },
    teacher:{
        type:String
    },
    week:{
        type: String
    },
    username:{
        type: String
    },
    studentname:{
        type: String
    },
    isSign:{
        type: Boolean
    }
})

module.exports = mongoose.model('Sign', schema)