const express = require('express');
const router = express.Router();
const itemController = require('../controllers/ItemController');
const authmiddleware=require('../middlewares/UserMiddleware')
// Route to add an item to the cart
router.post('/cart/item/:email',authmiddleware, itemController.addItemToUserCart);

// Route to get the user's cart
router.get('/cart/:email', itemController.getUserCart);

// Route to delete an item from the cart by item name
router.delete('/cart/item/:email/:name', authmiddleware,itemController.deleteItem);

// Define the route to clear all items from the cart
router.delete('/cart/clear/:email', authmiddleware,itemController.removeAllItems);

// Route to decrease item quantity in the cart
router.put('/cart/item/decrease/:email', authmiddleware,itemController.decreaseItemQuantity);

// Route to increase item quantity in the cart
router.put('/cart/item/increase/:email', authmiddleware,itemController.increaseItemQuantity);

module.exports = router;
