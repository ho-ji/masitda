const router = require('express').Router()
const Cart = require('../models/Cart')

router.post('/:uid', async (req, res) => {
  const uid = req.params.uid
  const {product_id, count} = req.body
  try {
    let cart = await Cart.findOne({uid})
    if (!cart) {
      cart = new Cart({uid: uid, products: []})
    }
    const index = cart.products.findIndex((item) => item.product.toString() === product_id.toString())
    if (index !== -1) {
      cart.products[index].count += parseInt(count)
    } else {
      cart.products.push({product: product_id, count: parseInt(count)})
    }
    await cart.save()
    res.status(200).json({message: 'Product added to cart'})
  } catch (error) {
    res.status(500).json({message: 'Fail to add product to cart'})
  }
})

router.get('/:uid', async (req, res) => {
  const uid = req.params.uid
  try {
    const cart = await Cart.findOne({uid}).populate({path: 'products.product', select: 'name image cost rate'})
    if (!cart) {
      return res.status(200).send([])
    }
    res.status(200).send(cart.products)
  } catch (error) {
    res.status(500).json({message: 'Fail to load cart'})
  }
})

module.exports = router
