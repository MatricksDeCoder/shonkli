const express           = require('express')
const inventoryRouter   = express.Router()

// import the controller 
const controller        = require('../controllers/inventory.controller')

// get all inventory; requires authenticated, requires admin access
inventoryRouter.get('/', controller.getAllInventory)

// add to inventory; requires authenticated, requires admin
inventoryRouter.post('/', controller.postOneInventory)

// delete inventory item
inventoryRouter.delete('/:id', controller.deleteOneInventory)

module.exports = inventoryRouter