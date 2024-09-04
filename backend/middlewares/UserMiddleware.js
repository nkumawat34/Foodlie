const jwt = require('jsonwebtoken');

// JWT verification middleware
const verifyToken = (req, res, next) => {
  // Get token from Authorization header
  const token = req.header('Authorization')?.replace('Bearer ', '');

  // Check if token is provided
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    // Verify the token using the JWT secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Attach user data to request object
    req.user = decoded;
    
    // Proceed to the next middleware or route handler
    next();
  } catch (err) {
    // If token verification fails, send an error response
    res.status(400).json({ message: 'Invalid token.' });
  }
};

module.exports = verifyToken;
