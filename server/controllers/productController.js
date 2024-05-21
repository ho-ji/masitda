const servie = require('../services/productService')

const getProductRanking = async (req, res) => {
  const limit = parseInt(req.query.limit) || 50
  try {
    const ranking = await servie.getProductRankingList(limit)
    res.status(200).send(ranking)
  } catch (error) {
    res.status(500).json({
      message: 'Ranking Not Found',
    })
  }
}

module.exports = {
  getProductRanking,
}
