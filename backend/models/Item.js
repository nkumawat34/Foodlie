const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  off_price: {
    type: Number,
    required: true,
  },
  quantity:{
    type:Number,
    default:1
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
