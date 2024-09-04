const Item = require('../models/Item');

const User = require('../models/User'); // Import your User model

// Add item to user's cart
exports.addItemToWishList = async (req, res) => {
    try {
        const { email } = req.params; // Get email from URL parameters
        const { item } = req.body;    // Get item from request body
       console.log(item)
       //  Validate input
        if (!item || !item.name) {
            return res.status(400).json({ message: 'Item and item name are required' });
        }

        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the item already exists in the wishlist
        const existingItemIndex = user.wishlist.findIndex(wishlistItem => wishlistItem.name === item.name);

        if (existingItemIndex !== -1) {
            return res.status(400).json({ message: 'Item already exists in wishlist' });
        }

        // Add the item to the wishlist
        user.wishlist.push(item);

        // Save the updated user
        await user.save();

        res.status(200).json({
            message: 'Item added to wishlist successfully',
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                wishlist: user.wishlist
            }
        });
    } catch (error) {
        res.status(500).json({
            message: 'Failed to add item to wishlist',
            error: error.message,
        });
    }
};



exports.deleteWishlistItem = async (req, res) => {
    try {
        const {  email,name } = req.params;  // Extract name and email from request parameters
        

        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        // Check if the item with the specified name exists in the wishlist
        const existingItemIndex = user.wishlist.findIndex(wishlistItem => wishlistItem.name === name);

        if (existingItemIndex === -1) {
            return res.status(404).json({ message: 'Item not found in wishlist' });
        }

        // Remove the item from the wishlist
        user.wishlist.splice(existingItemIndex, 1);

        // Save the updated user
        await user.save();

        res.status(200).json({
            message: 'Item deleted successfully',
        });
    } catch (error) {
        res.status(500).json({
            message: 'Failed to delete item',
            error: error.message,
        });
    }
};

  

// Fetch all items in the cart of a particular user
exports.getUserWishList = async (req, res) => {
    try {
        const { email } = req.params; // Get email from URL parameters

        // Validate input
        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }


        // Find the user by email
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        //console.log(user.cart)

        // Respond with the user's cart items
        res.status(200).json({
            message: 'Wish items fetched successfully',
            wishlist: user.wishlist
        });
    } catch (error) {
        res.status(500).json({
            message: 'Failed to fetch cart items',
            error: error.message,
        });
    }
};
