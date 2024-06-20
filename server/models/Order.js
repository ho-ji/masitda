const mongoose = require('mongoose')

const orderItemSchema = new mongoose.Schema({
  product: {type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true},
  count: {type: Number, required: true},
  cost: {type: Number, required: true},
  rate: {type: Number, default: 0},
})

const orderSchema = new mongoose.Schema({
  uid: {type: String, required: true},
  products: [orderItemSchema],
  orderDate: {type: Date, default: Date.now, required: true},
  name: {type: String, required: true},
  contactNumber: {
    type: String,
    match: /^\d{2,3}\d{3,4}\d{4}$/,
    required: true,
  },
  address: {
    zonecode: {type: String, match: /[0-9\-]{5}/, required: true},
    road_address: {type: String, required: true},
    detail_addresss: {type: String, required: true},
  },
})

const Order = mongoose.model('Order', orderSchema)

module.exports = Order
