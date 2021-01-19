const UserModel   = require('../models/user.model')

// GET ALL INVENTORY => ([GET] ../inventory)
exports.getAllInventory = async (req,res,next) => {
    console.log('getAllInventory: [GET] /inventory')
    try {
        const user = req.user.sub;
        const inventoryItems = await InventoryItem.find({
          user
        })
        res.json(inventoryItems);
      } catch (err) {
        return res.status(400).json({ error: err })
      }
}

// ADD AN INVENTORY ITEM => ([POST] ../inventory)
exports.postOneInventory = async (req,res,next) => {
    console.log('postOneInventory: [GET] /inventory')
    try {
        const userId = req.user.sub;
        const input = Object.assign({}, req.body, {
          user: userId
        });
        const inventoryItem = new InventoryItem(input);
        await inventoryItem.save();
        res.status(201).json({
          message: 'Inventory item created!',
          inventoryItem
        })
      } catch (err) {
        return res.status(400).json({
          message: 'There was a problem creating the item'
         })
      }
}
  
// DELETE INVENTORY ITEM => ([DELETE] ../inventory/:id)
exports.deleteOneInventory = async (req,res,next) => {
    console.log('deleteOneInventory: [DELETE] /inventory/:id')
    try {
        const deletedItem = await InventoryItem.findOneAndDelete(
          { _id: req.params.id, user: req.user.sub }
        );
        res.status(201).json({
          message: 'Inventory item deleted!',
          deletedItem
        })
      } catch (err) {
        return res.status(400).json({
          message: 'There was a problem deleting the item.'
        })
      }
}
