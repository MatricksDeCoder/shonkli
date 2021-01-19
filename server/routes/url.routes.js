const express      = require('express')
const urlRouter    = express.Router()

// import the controller 
const controller   = require('../controllers/url.controller')

// get & use short url and redirect 
urlRouter.get('/:slug', controller.getUrl)

// create a custom slug 
urlRouter.post('/', controller.postUrl)

module.exports = urlRouter