
const User=require("../models/User")
// Create a new order
exports.createOrder = async (req, res) => {
    try {
        const { order } = req.body; // Assuming order is an object and not an array
        const { email } = req.params;

        // Find the user by email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        console.log(order)
      

        // Add timestamps if needed
        order.createdAt = new Date();

        // Push the new order into the user's orders array
        user.orders.push(order);

        // Save the updated user document
        const updatedUser = await user.save();

        // Respond with the updated user
        res.status(200).json(updatedUser);
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Fetch orders for a user
exports.fetchOrders = async (req, res) => {
    try {
        const { email } = req.params; // Extract email from request parameters

        // Find the user by email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Respond with the user's orders
        res.status(200).json(user.orders);
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ message: 'Server error' });
    }
};