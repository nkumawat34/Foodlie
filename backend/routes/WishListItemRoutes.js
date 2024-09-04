const express = require('express');
const router = express.Router();
const wishlistController = require('../controllers/WishListController');

// Route to get all wishlist items for a user
router.get('/:email', wishlistController.getUserWishList);

// Route to add an item to the user's wishlist
router.post('/:email', wishlistController.addItemToWishList);

// Route to delete an item from the user's wishlist by item name
router.delete('/:email/:name', wishlistController.deleteWishlistItem);

module.exports = router;
