const mongoose = require('mongoose')

const orderItemSchema = new mongoose.Schema({
  product: {type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true},
  count: {type: Number, required: true},
  price: {type: Number, required: true},
})

const orderSchema = new mongoose.Schema({
  uid: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
  products: [orderItemSchema],
  orderDate: {type: Date, default: Date.now},
})

const Order = mongoose.model('Order', orderSchema)

module.exports = Order
