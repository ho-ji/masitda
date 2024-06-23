const Order = require('../models/Order')
const tempOrderService = require('../services/tempOrderService')

const limit = 10

const completeOrder = async ({uid, orderId, name, contactNumber, address}) => {
  const tempOrder = await tempOrderService.getTempOrder(uid, orderId)
  const order = new Order({products: tempOrder, uid, orderDate: new Date(), name, contactNumber, address})
  await order.save()
  await tempOrderService.deleteTempOrder(uid, orderId)
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
    .limit(3)
    .populate({path: 'products.product'})
  const products = orderList.flatMap((order) => [...order.products])

  return products.slice(0, 3)
}

module.exports = {
  completeOrder,
  getOrderList,
  getRecentOrderList,
}
