const Item = require('./Item'); // Import CartItem schema
const mongoose = require('mongoose');
// Define the User schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,  // Ensure unique email addresses
    },
    password: {
        type: String,
        required: true,
    },
    wishlist: [Item.schema],
    cart: [Item.schema],  // Embedding the cartItemSchema directly
    orders: []  // Embedding the orderSchema directly
});

module.exports = mongoose.model('User', userSchema);