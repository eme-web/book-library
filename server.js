import express from "express";
import cookieParser from 'cookie-parser';
import dotenv from "dotenv";
import connectDb from "./config/database.js";
import auth from './routes/auth.js';
import bookRoutes from './routes/bookRoutes.js'

dotenv.config()
connectDb();

const app = express();


app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

app.use(cookieParser());

app.use('/api/v1/auth', auth);
app.use('/api/v1/books', bookRoutes);


app.get('/api/v1', (req, res) => {
    res.status(200).json({
      status: 'success',
      message: 'Welcome to book-library APIs',
      data: [``],
    });
  });
  
  app.all('*', (req, res) => {
    res.status(404).json({
      status: 'fail',
      message: `Endpoint ${req.originalUrl} not found`,
      error: `[Can't find ${req.originalUrl} on this API]`,
    });
  });



const port = process.env.port || 5000;

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
