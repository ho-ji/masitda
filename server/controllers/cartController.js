const service = require('../services/cartService')

const postCart = async (req, res) => {
  const uid = req.params.uid
  const {productId, count} = req.body
  try {
    await service.addToCart({uid, productId, count})
    res.status(200).json({message: 'Product added to cart'})
  } catch (error) {
    res.status(500).json({message: 'Fail to add product to cart'})
  }
}

const getCart = async (req, res) => {
  const uid = req.params.uid
  try {
    const cart = await service.getCartProductByUid(uid)
    if (!cart) {
      return res.status(200).send([])
    }
    res.status(200).send(cart.products)
  } catch (error) {
    res.status(500).json({message: 'Fail to load cart'})
  }
}

const deleteCart = async (req, res) => {
  const uid = req.params.uid
  const idList = req.body.productId
  try {
    await service.deleteCartProduct(uid, idList)
    res.status(200).json({message: 'Cart product deleted'})
  } catch (error) {
    res.status(500).json({message: 'Fail to delete cart product'})
  }
}

module.exports = {
  postCart,
  getCart,
  deleteCart,
}
