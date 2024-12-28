import express from 'express';
import mongoose from 'mongoose';
import userRoutes from '../backend/routes/authRoutes.js'

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
  
  app.listen(3000, () => {
    console.log("Server is running on port 3000!");
  });
  
    
  app.use('/api/auth', userRoutes)


  app.use((err, res) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(statusCode).json({
      success: false,
      statusCode,
      message,
    });
  });  