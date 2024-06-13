const service = require('../services/orderService')
const userService = require('../services/userService')

const postOrder = async (req, res) => {
  const uid = req.params.uid
  const orderList = req.body.orderList
  const isLogIn = !uid.startsWith('guest')
  const accessToken = req.headers.authorization?.split('Bearer ')[1]
  const refreshToken = req.cookies?.refreshToken
  try {
    if (!isLogIn) return res.status(200).json({success: false, message: 'No Login'})
    const result = await userService.verifyToken({uid, accessToken, refreshToken})
    if (!result.success) {
      return res.status(200).json(result)
    }
    const {accessToken: newAccessToken, refreshToken: newRefreshToken} = await userService.createToken(uid)
    await service.completeOrder({uid, orderList})
    res.cookie('refreshToken', newRefreshToken, {httpOnly: true, secure: true})
    return res.status(200).json({success: true, accessToken: newAccessToken, message: 'Order Complete'})
  } catch (error) {
    console.error(error)
    res.status(500).json({message: 'Fail to Order'})
  }
}

const getOrder = async (req, res) => {
  const uid = req.params.uid
  const isLogIn = !uid.startsWith('guest')
  const accessToken = req.headers.authorization?.split('Bearer ')[1]
  const refreshToken = req.cookies?.refreshToken
  const page = parseInt(req.query.page)
  try {
    if (!isLogIn) return res.status(200).json({success: false, message: 'No Login'})
    const result = await userService.verifyToken({uid, accessToken, refreshToken})
    if (!result.success) {
      return res.status(200).json(result)
    }
    const {accessToken: newAccessToken, refreshToken: newRefreshToken} = await userService.createToken(uid)
    const orderList = await service.getOrderList(uid, page)
    res.cookie('refreshToken', newRefreshToken, {httpOnly: true, secure: true})
    return res.status(200).json({success: true, accessToken: newAccessToken, orderList})
  } catch (error) {
    console.error(error)
    res.status(500).json({message: 'Fail to load order list'})
  }
}

module.exports = {
  postOrder,
  getOrder,
}
