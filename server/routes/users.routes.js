const express      = require('express')
const usersRouter  = express.Router()

// import the controller 
const controller   = require('../controllers/users.controller')

usersRouter.get('/', controller.getAllUsers)

usersRouter.get('/:id', controller.getOneUser)

usersRouter.delete('/:id', controller.deleteOneUser)

usersRouter.get('/role', controller.getUserRole)

usersRouter.patch('/role', controller.patchUserRole)

usersRouter.get('/bio', controller.getBioUser)

usersRouter.patch('/bio',controller.patchBioUser)

module.exports = usersRouter