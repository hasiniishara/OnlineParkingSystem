import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import passport from 'passport';
import authRoutes from './routes/authRoute';
import parkinghRoutes from './routes/parkingRoutes';
import passportConfig from './middleware/passportConfig';

// Check required environment variables
const mongoUri = process.env.MONGO_URI;
const port = process.env.PORT;
const jwtSecret = process.env.JWT_SECRET;

if (!mongoUri || !port || !jwtSecret) {
  throw new Error("Missing required environment variables");
}

const cors = require('cors');
// Initialize Express app
const app = express();

// Passport configuration
passportConfig(passport, jwtSecret);

const allowedLinks = ["http://localhost:5173"];

const corsOptions = {
  origin: function (origin, callback){
    if(allowedLinks.indexOf(origin) !== -1 || !origin){
      callback(null, true)
    }else{
      callback(new Error('CORS violation'))
    }
  },
  optionSuccessStatus:200,
  credentials: true
}

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(passport.initialize());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/parking', parkinghRoutes);

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
