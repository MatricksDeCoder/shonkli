const express      = require('express')
const usersRouter  = express.Router()

// import the controller 
const controller   = require('../controllers/user.controller')

usersRouter.get('/', controller.getAllUsers)

usersRouter.get('/:id', controller.getOne)

usersRouter.put('/:id', controller.updateOne)

usersRouter.delete('/:id', controller.deleteOne)

usersRouter.get('/role', controller.getUserRole)

usersRouter.patch('/role', controller.patchUserRole)

usersRouter.get('/bio', controller.getBio)

usersRouter.patch('/bio',controller.patchBio)

module.exports = infoRouter