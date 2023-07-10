
const express = require('express')
const crud = express.Router()
const appController = require('../controllers/appController.js')

crud.get('/registrar', appController.registrar)
crud.get('/mostrar', appController.mostrar)
crud.get('/editar:id', appController.EditarReg)

crud.post('/registrar', appController.RegPost)

module.exports = crud
