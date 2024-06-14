const TempOrder = require('../models/TempOrder')

const processingOrder = async ({uid, orderList}) => {
  const tempOrder = new TempOrder({uid, products: orderList, orderDate: new Date()})
  await tempOrder.save()
}

const getTempOrder = async (uid, orderId) => {
  const order = await TempOrder.find({uid, _id: orderId})
  return order
}

module.exports = {
  processingOrder,
  getTempOrder,
}
