import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import passport from 'passport';
import authRoutes from './routes/authRoute';
import passportConfig from './middleware/passportConfig';

// Check required environment variables
const mongoUri = process.env.MONGO_URI;
const port = process.env.PORT;
const jwtSecret = process.env.JWT_SECRET;

if (!mongoUri || !port || !jwtSecret) {
  throw new Error("Missing required environment variables");
}

// Initialize Express app
const app = express();

// Passport configuration
passportConfig(passport, jwtSecret);

// Middleware
app.use(express.json());
app.use(passport.initialize());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Routes
app.use('/api/auth', authRoutes);

// Connect to MongoDB and start the server
mongoose
  .connect(mongoUri)
  .then(() => {
    app.listen(port, () => {
      console.log(`App running on PORT ${port}`);
    });
  })
  .catch((error) => {
    console.log('MongoDB connection error:', error);
  });
