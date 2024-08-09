const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  imageUrl: {type: String, required: true},
  name: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  variations: [
    {
      color: { type: String, required: true },
      size: { type: String, required: true },
    },
  ],
  isVisible: { type: Boolean, default: true },
});
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
