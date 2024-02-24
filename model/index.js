const mongoose = require('mongoose');
const dotenv = require('dotenv')
dotenv.config()

const DATABASEURL = process.env.MONGOURI

const database = () => {

    // Connect to MongoDB
    mongoose.connect(DATABASEURL);

    // Handling connection events
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
    db.once('open', () => {
        console.log('Connected to MongoDB');
    });

    // Define your schema and models here

    module.exports = mongoose;

}

module.exports = database