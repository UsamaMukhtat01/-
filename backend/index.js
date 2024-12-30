import express from 'express';
import mongoose from 'mongoose';
import cookieParser from "cookie-parser";
import userRoutes from '../backend/routes/authRoutes.js';
import movieRoutes from '../backend/routes/movieRoutes.js';
import reservationRoutes from '../backend/routes/reservationRoutes.js';

mongoose
  .connect("mongodb://localhost:27017/")
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((err) => {
    console.log(err,"Database not connected successfully");
  });

  
  const app = express();
  
  app.use(express.json());
  app.use(cookieParser());
  
  app.listen(3000, () => {
    console.log("Server is running on port 3000!");
  });
  
    
  app.use('/api/auth', userRoutes)
  app.use('/api/user', movieRoutes)
  app.use('/api/user', reservationRoutes)


  app.use((err, res) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(statusCode).json({
      success: false,
      statusCode,
      message,
    });
  });  