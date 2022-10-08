const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    coursename: {
        type: String
    },
    teacher: {
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
    year: {
        type: String
    },
    startweek:{
        type:String
    },
    endweek:{
        type:String
    },
    username:{
        type:String
    },
    studentname:{
        type:String
    }
})

module.exports = mongoose.model('Timetable', schema)