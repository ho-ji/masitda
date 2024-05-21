const Product = require('../models/Product')

const getProductRankingList = async (limit) => {
  return await Product.find({}).sort({sales_count: -1}).limit(limit)
}

module.exports = {
  getProductRankingList,
}
