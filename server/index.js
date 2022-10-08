const express = require("express")
const cors = require('cors')

const app = express()

app.set('secret', 'asdjkl')

app.use(cors())
app.use(express.json())
app.use('/uploads',express.static(__dirname+'/uploads'))


require('./db/db')(app)
require('./routes/admin/index')(app)

app.listen(3030, () => {
    console.log('http://localhost:3030')
})