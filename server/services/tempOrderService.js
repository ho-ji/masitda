const TempOrder = require('../models/TempOrder')

const processingOrder = async ({uid, order}) => {
  const tempOrder = new TempOrder({uid, products: order, orderDate: new Date()})
  await tempOrder.save()
}

const getTempOrder = async (uid, orderId) => {
  const order = await TempOrder.findOne({uid, _id: orderId}).populate({path: 'products.product'})
  return order
}

const deleteTempOrder = async (uid, orderId) => {
  await TempOrder.deleteOne({uid, _id: orderId})
}

module.exports = {
  processingOrder,
  getTempOrder,
  deleteTempOrder,
}
