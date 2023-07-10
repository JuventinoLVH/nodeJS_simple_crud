const express = require('express')
const router = express.Router()
const appController = require('../controllers/appController.js')

// Application Routes
router.get('/', appController.home)
router.get('/dependencies', appController.dependencies)

module.exports = router
