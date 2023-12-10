const express = require('express');
const router = express.Router();
const Model = require('../models/model');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost:27017/bookstore', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));



const Book = mongoose.model('Book', bookSchema);

app.use(bodyParser.json());

app.get('/api/books', async (req, res) => {
    try {
      const books = await Book.find();
      res.json(books); 
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  

app.post('/api/books', async (req, res) => {
  const book = new Book({
    title: req.body.title,
    author: req.body.author,
    genre: req.body.genre,
  });

  try {
    const newBook = await book.save();
    res.status(201).json(newBook);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
