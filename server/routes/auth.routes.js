const express      = require('express')
const authRouter   = express.Router()

// import the controller 
const controller   = require('../controllers/auth.controller')

// signup a new user if not signed up already
authRouter.post('/signup', controller.postSignup)

// login a user
authRouter.post('/login', controller.postLogin)

module.exports = authRouter
