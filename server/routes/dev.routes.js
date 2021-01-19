const express      = require('express')
const devRouter    = express.Router()

// import the controller 
const controller   = require('../controllers/dev.controller')

devRouter.get('/test', controller.getTest)

devRouter.get('/config', controller.getConfig)

devRouter.get('/version', controller.getVersion)

module.exports     = devRouter