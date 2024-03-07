const mongoose = require('mongoose');

// Define the user schema
const sentUserSchema = new mongoose.Schema({
  userid: {
    type: Number,
    required: true,
  },
  email: {
    status: {
      type: String,
    },
    message: {
      type: String,
    },
    details: {
      type: mongoose.Schema.Types.Mixed,
    },
  },
  message: {
    status: {
      type: String,
    },
    message: {
      type: String,
    },
    details: {
      type: mongoose.Schema.Types.Mixed,
    },
  },
  whatsapp: {
    status: {
      type: String,
    },
    message: {
      type: String,
    },
    details: {
      type: mongoose.Schema.Types.Mixed,
    },
  },
},
{
  timestamps: true, // Add createdAt and updatedAt fields
});

// Create the Mongoose model
const SentUser = mongoose.model('SentUser', sentUserSchema);

module.exports = SentUser;
