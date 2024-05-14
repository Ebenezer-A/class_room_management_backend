import express from 'express';
import passport from 'passport';
import * as envVars from '../config/env.js';
import User from '../models/user.js';
import jwt from "jsonwebtoken"
import bcrypt from 'bcrypt'


const router = express.Router();

router.post('/login', (req, res, next) => {
    passport.authenticate('local', { session: false }, (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      const token = jwt.sign({ userId: user._id }, envVars.jwtkey);
      return res.json({ token });
    })(req, res, next);
  });

router.post('/signup', async (req, res, next) => {
    try {
      const { email, password } = req.body;
  
      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }
  
      // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user with hashed password
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

  
      // Generate JWT token
      const token = jwt.sign({ userId: newUser._id }, envVars.jwtkey);
  
      return res.json({ token });
    } catch (error) {
      return next(error);
    }
  });
  

export default router;
