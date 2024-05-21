const MDPick = require('../models/MDPick')

module.exports.getMDPick = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 0
    const list = await MDPick.find({}).populate('product').limit(limit)
    const products = list.map((item) => item.product)
    res.status(200).send(products)
  } catch (error) {
    res.status(500).json({
      message: 'MDPick Not Found',
    })
  }
}
