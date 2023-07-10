const express = require('express')
const hbs = require('hbs')
const routes = require('./routes/routes')
const crud = require('./routes/crud')
const path = require('path')

const app = express()
const PORT = 3000

app.set('view engine', hbs)
app.use('/', routes)
app.use('/dbreq', crud)
app.use(express.static(path.join(__dirname, '/public')))
app.use((req,res,next) =>{
    res.status(404).send("Error: 404")
}
)

app.listen(PORT, () => {
  console.log(`app is running on PORT ${PORT}`)
})
module.exports = app
