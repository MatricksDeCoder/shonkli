const express                = require('express')
const dashBoardDataRouter    = express.Router()

// import the controller 
const controller   = require('../controllers/dashboardData.controller')

dashBoardDataRouter.get('/', controller.getDashBoardData)

module.exports     = dashBoardDataRouter