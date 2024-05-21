const Cart = require('../models/Cart')

const getCartByUid = async (uid) => {
  return await Cart.findOne({uid})
}

const getCartProductByUid = async (uid) => {
  return await Cart.findOne({uid}).populate({path: 'products.product'})
}

const createCartByUid = async (uid) => {
  const cart = new Cart({uid: uid, products: []})
  await cart.save()
  return cart
}

const updateCart = async (cart) => {
  await cart.save()
}

const addToCart = async (uid, productId, count) => {
  let cart = await getCartByUid(uid)
  if (!cart) cart = createCart(uid)
  const index = cart.products.findIndex((item) => item.product.toString() === productId.toString())
  if (index !== -1) {
    cart.products[index].count += parseInt(count)
  } else {
    cart.products.push({product: productId, count: parseInt(count)})
  }
  await updateCart(cart)
}

const deleteCartProduct = async (uid, idList) => {
  let cart = await service.getCart(uid)
  if (cart) {
    for (const idItem of idList) {
      cart.products = cart.products.filter((item) => item.product.toString() !== idItem.toString())
    }
    await service.updateCart(cart)
  }
}

module.exports = {
  getCartByUid,
  getCartProductByUid,
  createCartByUid,
  updateCart,
  addToCart,
  deleteCartProduct,
}
