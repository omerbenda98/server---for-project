const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema({
  roomID:{
    type:String,
    ref:'User',
    required:true
  },
  senderID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  recepientID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  content: {
    type: String,
    required: true
  },
  time: {
    type: String,
    default: Date.now,
    required: true
  },
  author:{
    type: String,
    required:true
  },
  timestamp: {
    type: Number,
    default: () => Date.now(), // Return a timestamp when a new document is created
  },
});

module.exports = mongoose.model('Chat', ChatSchema);
