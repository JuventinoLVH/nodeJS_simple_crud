
const express = require('express')
const crud = express.Router()
const appController = require('../controllers/appController.js')

crud.get('/registrar', appController.registrar)
crud.get('/mostrar', appController.mostrar)

module.exports = crud
