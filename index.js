// server/index.js

import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from 'cors';
import bodyParser from "body-parser";
import userRoutes from './routes/user.js';
import videoRoutes from './routes/video.js';
import commentsRoutes from './routes/comments.js';

import path from 'path';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use('/uploads', express.static(path.join('uploads')));

app.get('/', (req, res) => {
  res.send("hello");
});
app.use(bodyParser.json());

// Registration Route
app.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Perform additional validation if needed

    // Create a new user in the database
    const newUser = new User({ name, email, password });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/api/user/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Perform additional validation if needed

    // Create a new user in the database
    const newUser = new User({ name, email, password });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error during signup:', error);

    // Return a more detailed error response
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
});


// app.use('/api/user', userRoutes);
app.use('/video', videoRoutes);
app.use('/comment', commentsRoutes);
app.use('/user', userRoutes);

const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
  console.log(`Server Running on the PORT ${PORT}`);
});

const DB_URL = process.env.CONNECTION_URL;
mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB database connected");
  })
  .catch((error) => {
    console.log(error);
  });
mongoose.set('strictQuery', false);