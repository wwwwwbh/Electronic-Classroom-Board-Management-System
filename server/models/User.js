const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const schema = new mongoose.Schema({
    username: {
        type: String
    },
    class: {
        type: String
    },
    name: {
        type: String
    },
    college: {
        type: String
    },
    faceid: {
        type: String
    },
    phone: {
        type: String
    },
    password: {
        type: String,
        select: false,
        set(val) {
            //10为散列加密指数，指数越高，加密时间越长
            return bcrypt.hashSync(val, 10)
        }
    },
    type: {
        type: String
    }
})

module.exports = mongoose.model('User', schema)