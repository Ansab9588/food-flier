// db.js

const mongoose = require('mongoose');

const dbURL = 'mongodb+srv://ansab9588:ansab9588@cluster0.u3xqxpg.mongodb.net/?retryWrites=true&w=majority'; // Change 'mydatabase' to your database name

mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

db.once('open', () => {
  console.log('Connected to MongoDB successfully');
});

module.exports = db;
