const service = require('../services/mdPickService')

const getMDPick = async (req, res) => {
  const limit = parseInt(req.query.limit) || 0
  try {
    const list = await service.getMDPickProductList(limit)
    res.status(200).send(list.map((item) => item.product))
  } catch (error) {
    res.status(500).json({
      message: 'MDPick Not Found',
    })
  }
}

module.exports = {
  getMDPick,
}
