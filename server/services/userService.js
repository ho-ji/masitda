const User = require('../models/User')
const Token = require('../models/Token')
const jwt = require('jsonwebtoken')
const {verifyAccessToken} = require('../utils/token')

const getUserByAccount = async (account) => {
  return await User.findOne({account})
}

const getUserByUid = async (uid) => {
  return await User.findById({_id: uid})
}

const updateUser = async (user) => {
  await user.save()
}

const signUpUser = async (info) => {
  const user = new User(info)
  updateUser(user)
}

const createToken = async (uid) => {
  const accessToken = jwt.sign({uid}, process.env.ACCESS_TOKEN_KEY, {expiresIn: '10m'})
  const refreshToken = jwt.sign({uid}, process.env.REFRESH_TOKEN_KEY, {expiresIn: '7d'})

  const token = new Token({
    uid,
    refreshToken,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  })
  await token.save()
  return {accessToken, refreshToken}
}

const verifyToken = async ({uid, accessToken, refreshToken}) => {
  const token = await Token.findOne({uid, refreshToken})
  if (!accessToken) {
    const {accessTokenValid, accessTokenError} = verifyAccessToken(accessToken, uid)
    if (accessTokenError) {
      return {success: false, message: accessTokenError}
    }
    if (accessTokenValid) {
      await Token.deleteOne({refreshToken})
      return {success: true}
    }
  }
  if (!token) {
    return {success: false, message: 'Token Error'}
  }
  await Token.deleteOne({_id: token._id})

  const currentTime = new Date()
  if (currentTime - token.expiresAt > 0) {
    return {success: false, message: 'Re-Login'}
  }
  return {success: true}
}

const postUserOrderCount = async (uid) => {
  const user = await getUserByUid(uid)
  if (!user) return {success: false, message: 'No user'}
  user.orderCount += 1
  await user.save()
  return {success: true}
}

module.exports = {
  getUserByAccount,
  getUserByUid,
  updateUser,
  signUpUser,
  createToken,
  verifyToken,
  postUserOrderCount,
}
