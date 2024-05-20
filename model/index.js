const mongoose = require('mongoose');
const dotenv = require('dotenv')
dotenv.config()

const DATABASEURL = process.env.MONGOURI

const database = async () => {
    try {
      await mongoose.connect(DATABASEURL);
      console.log('Connected to MongoDB');
    } catch (err) {
      console.error('MongoDB connection error:', err);
      throw err;
    }
  };


module.exports = database