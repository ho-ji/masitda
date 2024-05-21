const Cart = require('../models/Cart')

module.exports.postCart = async (req, res) => {
  const uid = req.params.uid
  const {productId, count} = req.body
  try {
    let cart = await Cart.findOne({uid})
    if (!cart) {
      cart = new Cart({uid: uid, products: []})
    }
    const index = cart.products.findIndex((item) => item.product.toString() === productId.toString())
    if (index !== -1) {
      cart.products[index].count += parseInt(count)
    } else {
      cart.products.push({product: productId, count: parseInt(count)})
    }
    await cart.save()
    res.status(200).json({message: 'Product added to cart'})
  } catch (error) {
    res.status(500).json({message: 'Fail to add product to cart'})
  }
}

module.exports.getCart = async (req, res) => {
  const uid = req.params.uid
  try {
    const cart = await Cart.findOne({uid}).populate({path: 'products.product'})
    if (!cart) {
      return res.status(200).send([])
    }
    res.status(200).send(cart.products)
  } catch (error) {
    res.status(500).json({message: 'Fail to load cart'})
  }
}

module.exports.deleteCart = async (req, res) => {
  const uid = req.params.uid
  const idList = req.body.productId
  try {
    let cart = await Cart.findOne({uid})
    if (cart) {
      for (const idItem of idList) {
        cart.products = cart.products.filter((item) => item.product.toString() !== idItem.toString())
      }
      await cart.save()
      res.status(200).json({message: 'Cart product deleted'})
    }
  } catch (error) {
    res.status(500).json({message: 'Fail to delete cart product'})
  }
}
