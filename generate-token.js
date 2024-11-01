// generate-token.js

const jwt = require('jsonwebtoken');

const secretKey = 'your_jwt_secret_key'; // Replace with your JWT_SECRET_KEY or use process.env.JWT_SECRET_KEY
const token = jwt.sign(
  {
    sub: '1234567890', // User ID
    roles: ['Admin', 'User'], // Roles as per your Role enum
    permissions: ['Read', 'Write'], // Permissions as per your Permission enum
  },
  secretKey,
  {
    expiresIn: '1h', // Token expiration
    issuer: 'your-app', // Optional issuer
    audience: 'your-app-audience', // Optional audience
  }
);

console.log(token);
