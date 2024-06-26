const service = require('../services/userService')
const tokenService = require('../services/tokenService')
const cartService = require('../services/cartService')

const postUserSignUp = async (req, res) => {
  const info = req.body.info
  try {
    const user = await service.getUserByAccount(info.account)
    if (user) {
      return res.status(200).json({
        success: false,
        message: 'User ID already exists',
      })
    }
    await service.signUpUser(info)
    res.status(201).json({success: true, message: 'User registered'})
  } catch (error) {
    console.error(error)
    res.status(500).json({
      message: 'Fail to Signup',
    })
  }
}

const getUserCheckAccount = async (req, res) => {
  const {account} = req.params
  try {
    const user = await service.getUserByAccount(account)
    if (user) {
      return res.status(200).json({
        success: false,
        message: 'User ID already exists',
      })
    }
    res.status(200).json({
      success: true,
      message: 'User ID does not exist',
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      message: 'User ID is not available',
    })
  }
}

const postUserLogIn = async (req, res) => {
  const uid = req.params.uid
  const {account, password} = req.body
  try {
    const user = await service.getUserByAccount(account)
    if (!user) return res.status(200).json({success: false, message: 'Invalid ID or password'})

    const successLogIn = await user.checkPassword(password)
    if (!successLogIn) return res.status(200).json({success: false, message: 'Invalid ID or password'})

    await cartService.updateUserCart(uid, user._id)

    const {accessToken, refreshToken} = await tokenService.createToken(user._id)
    res.cookie('refreshToken', refreshToken, {httpOnly: true, secure: true, maxAge: 7 * 24 * 60 * 60 * 1000})
    res.status(200).json({success: true, accessToken, uid: user._id, message: 'Login success'})
  } catch (error) {
    console.error(error)
    res.status(500).json({
      message: 'Fail to Login',
    })
  }
}

const deleteUserLogOut = async (req, res) => {
  const uid = req.params.uid
  const refreshToken = req.cookies?.refreshToken
  try {
    await tokenService.deleteToken({uid, refreshToken})
    res.clearCookie('refreshToken', {httpOnly: true, secure: true})
    res.status(200).json({message: 'Logout success'})
  } catch (error) {
    console.error(error)
    res.clearCookie('refreshToken', {httpOnly: true, secure: true})
    res.status(500).json({
      message: 'Fail to Log out',
    })
  }
}

const getUser = async (req, res) => {
  const uid = req.params.uid
  const accessToken = req.headers.authorization?.split('Bearer ')[1]
  const refreshToken = req.cookies?.refreshToken
  try {
    const result = await tokenService.verifyToken({uid, accessToken, refreshToken})
    if (!result.success) {
      return res.status(200).json(result)
    }
    const {accessToken: newAccessToken, refreshToken: newRefreshToken} = await tokenService.createToken(uid)
    const user = await service.getUserByUid(uid)
    if (!user) return res.status(200).json({success: false, message: 'User not found'})

    res.cookie('refreshToken', newRefreshToken, {httpOnly: true, secure: true})
    return res.status(200).json({success: true, accessToken: newAccessToken, user: {name: user.name, orderCount: user.orderCount}, success: 'Successfully get user information'})
  } catch (error) {
    console.error(error)
    return res.status(200).json({success: false, message: 'Fail to Find User'})
  }
}

const getVerifyToken = async (req, res) => {
  const uid = req.params.uid
  const accessToken = req.headers.authorization?.split('Bearer ')[1]
  const refreshToken = req.cookies?.refreshToken
  try {
    const result = await tokenService.verifyToken({uid, accessToken, refreshToken})
    if (!result.success) {
      return res.status(200).json(result)
    }
    const {accessToken: newAccessToken, refreshToken: newRefreshToken} = await tokenService.createToken(uid)
    const user = await service.getUserByUid(uid)
    if (!user) return res.status(200).json({success: false, message: 'User not found'})

    res.cookie('refreshToken', newRefreshToken, {httpOnly: true, secure: true})
    res.status(200).json({success: true, accessToken: newAccessToken, message: 'User is be logged in'})
  } catch (error) {
    res.status(200).json({success: false, message: 'No Log In'})
  }
}

module.exports = {
  postUserLogIn,
  deleteUserLogOut,
  postUserSignUp,
  getUserCheckAccount,
  getUser,
  getVerifyToken,
}
