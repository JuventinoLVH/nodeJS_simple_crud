//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
//\\\\\\\\\\\\\\\\\\\\\\  Cabecera  \\\\\\\\\\\\\\\\\\\\\\\\\\
//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
require('dotenv').config()
const express = require('express')
const hbs = require('hbs')
const routes = require('./routes/routes')
const crud = require('./routes/crud')
const path = require('path')
const mongoose = require('mongoose');
const bodyParser = require('body-parser')

//~~~~~~~~~~~~~~~~ Variables globales ~~~~~~~~~~~~~~~~~~~~~~~~
mongoose.connect(`mongodb://localhost:27017/${process.env.DBNAME}`)
    .then(()=> console.log("Base de datos conectada"))
    .catch(e => console.log(e))

const app = express()
const PORT = process.env.PORT 

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

//~~~~~~~~~~~~~~~~~~~~~~ Midlleware ~~~~~~~~~~~~~~~~~~~~~~~~~~
app.set('view engine', hbs)
app.use('/', routes)
app.use('/', crud)
app.use(express.static(path.join(__dirname, '/public')))
app.use((req,res,next) =>{
    res.status(404).send("Error: 404")
}
)

//~~~~~~~~~~~~~~~~~~~~~~~ Server init ~~~~~~~~~~~~~~~~~~~~~~~~
app.listen(PORT, () => {
  console.log(`app is running on PORT ${PORT}`)
})
module.exports = app
