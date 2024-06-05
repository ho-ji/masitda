const User = require('../models/User')
const Token = require('../models/Token')
const jwt = require('jsonwebtoken')
const {verifyAccessToken} = require('../utils/token')

const getUserByAccount = async (account) => {
  return await User.findOne({account})
}

const getUserByUid = async (uid) => {
  return await User.findById(uid)
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

  await Token.deleteMany({refreshToken})

  const token = new Token({
    uid,
    refreshToken,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  })
  await token.save()
  return {accessToken, refreshToken}
}

const verifyToken = async ({uid, accessToken, refreshToken}) => {
  const {accessTokenValid, accessTokenError} = verifyAccessToken(accessToken, uid)
  if (accessTokenError) {
    return {success: false, message: accessTokenError}
  }
  if (!accessTokenValid) {
    const token = await Token.findOne({refreshToken})
    if (!token) {
      return {success: false, message: 'Token Error'}
    }
    if (token.uid !== uid) {
      return {success: false, message: 'Token Error'}
    }
    const currentTime = new Date()
    if (currentTime - token.expiresAt > 0) {
      await token.deleteOne({refreshToken})
      return {success: false, message: 'Re-Login'}
    }
  }
  return {success: true}
}

module.exports = {
  getUserByAccount,
  getUserByUid,
  updateUser,
  signUpUser,
  createToken,
  verifyToken,
}
