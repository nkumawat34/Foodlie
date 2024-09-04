const express = require('express');
const router = express.Router();
const itemController = require('../controllers/ItemController');

// Route to add an item to the cart
router.post('/cart/item/:email', itemController.addItemToUserCart);

// Route to get the user's cart
router.get('/cart/:email', itemController.getUserCart);

// Route to delete an item from the cart by item name
router.delete('/cart/item/:email/:name', itemController.deleteItem);

// Define the route to clear all items from the cart
router.delete('/cart/clear/:email', itemController.removeAllItems);

// Route to decrease item quantity in the cart
router.put('/cart/item/decrease/:email', itemController.decreaseItemQuantity);

// Route to increase item quantity in the cart
router.put('/cart/item/increase/:email', itemController.increaseItemQuantity);

module.exports = router;
