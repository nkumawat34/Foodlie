const Item = require('../models/Item');

const User = require('../models/User'); // Import your User model

// Add item to user's cart
exports.addItemToUserCart = async (req, res) => {
    try {
        const { email } = req.params; // Get email from URL parameters
        const { item } = req.body; // Get item from request body

        // Validate input
        if (!item || !item.name) {
            return res.status(400).json({ message: 'Item and item name are required' });
        }

        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the item already exists in the cart
        const existingItemIndex = user.cart.findIndex(cartItem => cartItem.name === item.name);

        if (existingItemIndex > -1) {
            // If item exists, increase the quantity
            user.cart[existingItemIndex].quantity += item.quantity || 1;
        } else {
            // If item doesn't exist, push it to the cart with a quantity of 1 or the specified quantity
            user.cart.push({ ...item, quantity: item.quantity || 1 });
        }

        // Save the updated user
        await user.save();

        res.status(200).json({
            message: 'Item added to cart successfully',
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                cart: user.cart
            }
        });
    } catch (error) {
        res.status(500).json({
            message: 'Failed to add item to cart',
            error: error.message,
        });
    }
};


/// Delete an item by name from a user's cart
exports.deleteItem = async (req, res) => {
    try {
      const { email, name } = req.params; // Extract email and name from request parameters
      console.log(email, name); // Debugging output
  
      // Find the user by email
      const user = await User.findOne({ email: email });
  
      if (!user) {
        return res.status(404).json({
          message: 'User not found',
        });
      }
  
      
        // Check if the item exists in the user's cart
        const itemIndex = user.cart.findIndex(item => item.name === name);
  
        if (itemIndex === -1) {
          return res.status(404).json({
            message: 'Item not found in user\'s cart',
          });
        }
  
        // Remove the item from the cart
        user.cart.splice(itemIndex, 1);
      
  
      // Save the updated user document
      await user.save();
  
      res.status(200).json({
        message: name ? 'Item deleted from cart successfully' : 'All items removed from cart successfully',
      });
    } catch (error) {
      res.status(500).json({
        message: 'Failed to update cart',
        error: error.message,
      });
    }
  };

  // Controller function to remove all items from a user's cart
exports.removeAllItems = async (req, res) => {
    try {
      const { email } = req.params; // Extract email from request parameters
      console.log(email); // Debugging output
  
      // Find the user by email
      const user = await User.findOne({ email: email });
  
      if (!user) {
        return res.status(404).json({
          message: 'User not found',
        });
      }
  
      // Clear all items from the cart
      user.cart = [];
  
      // Save the updated user document
      await user.save();
  
      res.status(200).json({
        message: 'All items removed from cart successfully',
      });
    } catch (error) {
      res.status(500).json({
        message: 'Failed to clear cart',
        error: error.message,
      });
    }
  };
// Fetch all items in the cart of a particular user
exports.getUserCart = async (req, res) => {
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
            message: 'Cart items fetched successfully',
            cart: user.cart
        });
    } catch (error) {
        res.status(500).json({
            message: 'Failed to fetch cart items',
            error: error.message,
        });
    }
};

// Increase the quantity of an item in the user's cart
exports.increaseItemQuantity = async (req, res) => {
    try {
        const { email } = req.params; // Get email from URL parameters
        const {item } = req.body; // Get item name and quantity from request body

      
        
       
        // Find the user by email
        const user = await User.findOne({ email });
      
       
         // Find the index of the item in the cart
         const existingItemIndex = user.cart.findIndex(cartItem => cartItem.name === item.name);
         
         if (existingItemIndex > -1) {
             // If item exists, decrease the quantity
             const existingItem = user.cart[existingItemIndex];
             if (existingItem.quantity > 0) {
              
                 existingItem.quantity += 1;
                 
             } 
             await user.save();
            
             return res.status(200).json({
                 message: 'Item quantity increased successfully',
                 user: {
                     id: user._id,
                     name: user.name,
                     email: user.email,
                     cart: user.cart
                 }
             });
         } else {
             return res.status(404).json({ message: 'Item not found in cart' });
         }

    

    } catch (error) {
        res.status(500).json({
            message: 'Failed to increase item quantity',
            error: error.message,
        });
    }
};
// Decrease item quantity in user's cart
exports.decreaseItemQuantity = async (req, res) => {
    try {
        const { email } = req.params; // Get email from URL parameters
        const { item } = req.body; // Get item from request body

        // Validate input
        if (!item || !item.name) {
            return res.status(400).json({ message: 'Item and item name are required' });
        }

        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Find the index of the item in the cart
        const existingItemIndex = user.cart.findIndex(cartItem => cartItem.name === item.name);

        if (existingItemIndex > -1) {
            // If item exists, decrease the quantity
            const existingItem = user.cart[existingItemIndex];
            if (existingItem.quantity > 1) {
                existingItem.quantity -= 1;
            } else {
                // Remove the item if quantity is 0
                user.cart.splice(existingItemIndex, 1);
            }
            await user.save();
            return res.status(200).json({
                message: 'Item quantity decreased successfully',
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    cart: user.cart
                }
            });
        } else {
            return res.status(404).json({ message: 'Item not found in cart' });
        }
    } catch (error) {
        res.status(500).json({
            message: 'Failed to decrease item quantity',
            error: error.message,
        });
    }
};