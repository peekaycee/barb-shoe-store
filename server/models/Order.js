const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  imageUrl: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  status: {
    type: String,
    enum: ['Pending', 'Delivered', 'Not Delivered'],
    default: 'Pending',
  },
  variations: [
    {
      color: { type: String, required: true },
      size: { type: String, required: true },
    },
  ],
  total: { type: Number, required: true },
});

module.exports = mongoose.model('Order', orderSchema);