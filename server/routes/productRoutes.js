const router = require('express').Router()
const Product = require('../models/Product')

router.get('/ranking', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 50
    const ranking = await Product.find({}).sort({sales_count: -1}).limit(limit)
    res.status(200).send(ranking)
  } catch (error) {
    res.status(500).json({
      message: 'Ranking Not Found',
    })
  }
})

module.exports = router
