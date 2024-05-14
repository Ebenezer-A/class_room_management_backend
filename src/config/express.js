import express from 'express';
import bodyParser from 'body-parser';
import passport from 'passport';
import authRoutes from '../routes/auth.js';


// Initialize Express app
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(passport.initialize());

// Passport config
import './passport.js';

// Routes
app.use('/auth', authRoutes);

// 404 - endpoint not found
app.use((req, res, next) => {
    res.status(404).send({
      message:  'Endpoint Not Found!'
    })
  });

// Error handler middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

export default app;