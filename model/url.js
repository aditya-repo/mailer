const mongoose = require('mongoose')
// Define URL schema
const urlSchema = new mongoose.Schema({
    originalUrl: { type: String, required: true },
    shortUid: { type: String, required: true, unique: true, maxlength: 5 }
});

const Url = mongoose.model('Url', urlSchema)

module.exports = Url