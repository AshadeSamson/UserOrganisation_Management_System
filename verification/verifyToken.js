import { JWT } from "../config/config.js";
import jwt from "jsonwebtoken"

export const verifyToken = (req, res, next) => {

    const authHeader = req.headers['authorization'];
    console.log('Authorization Header:', authHeader); 
    const token = authHeader && authHeader.split(' ')[1];
  
    console.log('Extracted Token:', token); 
  
    if (token == null) {
      console.log('No token provided'); 
      return res.status(401).json({ status: 'Unauthorized', message: 'No token provided', statusCode: 401 });
    }
  
    jwt.verify(token, JWT, (err, user) => {
      if (err) {
        console.log('Token verification failed:', err.message); 
        return res.status(403).json({ status: 'Forbidden', message: 'Invalid token', statusCode: 403 });
      }
  
      req.user = user;
      console.log('Authenticated User:', user); 
      next();
    });
  };

