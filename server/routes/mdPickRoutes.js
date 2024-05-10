const router = require('express').Router()
const MDPick = require('../models/MDPick')

router.get('/', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit)
    const list = await MDPick.find({})
      .populate('product')
      .limit(limit || 0)
    res.status(200).send(list)
  } catch (error) {
    res.status(500).json({
      message: 'MDPick Not Found',
    })
  }
})

module.exports = router
