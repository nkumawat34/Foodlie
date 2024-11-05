// server.js

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/UserRoutes'); // Adjust the path as needed
const itemRoutes=require("./routes/ItemRoutes")
const wishlistRoutes=require("./routes/WishListItemRoutes")
const orderRoutes=require('./routes/OrderRoutes')
const contactRoutes=require('./routes/contactRoutes')
const cors=require('cors')
// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(bodyParser.json()); // Parse incoming JSON requests

app.use(cors())
// Use routes
app.use('/api/auth', authRoutes);

// Use the routes
app.use('/api', orderRoutes); // Prefix all routes with /api

app.use('/api/wishlistitem',wishlistRoutes)
// Routes
app.use('/api', itemRoutes); // Prefix all item routes with /api

// Use the contact routes
app.use('/api', contactRoutes);
// Database connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Simple route for the home page
app.get('/', (req, res) => {
    res.send('Hello, World!');
});



// Set the port and start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
