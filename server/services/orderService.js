const Order = require('../models/Order')

const limit = 10

const completeOrder = async ({uid, orderList}) => {
  const order = new Order({uid, products: orderList, orderDate: new Date()})
  await order.save()
}

const getOrderList = async (uid, page = 1) => {
  const skip = (page - 1) * limit
  const orderList = await Order.find({uid}).sort({orderDate: -1}).skip(skip).limit(limit).populate({path: 'products.product'})
  return orderList
}

const getRecentOrderList = async (uid) => {
  const recentDate = new Date()
  recentDate.setMonth(recentDate.getMonth() - 3)
  const orderList = await Order.find({uid, orderDate: {$gte: recentDate}})
    .sort({orderDate: -1})
    .limit(limit)
    .populate({path: 'products.product'})
  return orderList
}

module.exports = {
  completeOrder,
  getOrderList,
  getRecentOrderList,
}
