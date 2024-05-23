const User = require('../models/User')
const Token = require('../models/Token')

const getUserByUserId = async (userId) => {
  return await User.findOne({userId: userId})
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

  await token.deleteMany({refreshToken})

  const token = new Token({
    uid,
    refreshToken,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  })
  await token.save()
  return {accessToken, refreshToken}
}

const verifyRefreshToken = async ({uid, refreshToken}) => {
  const token = await Token.findOne({refreshToken})
  if (!token) {
    return {refreshTokenValid: false, refreshTokenError: 'Token Error'}
  }
  if (token.uid !== uid) {
    return {refreshTokenValid: false, refreshTokenError: 'Token Error'}
  }
  const currentTime = new Date()
  if (currentTime - token.expiresAt > 0) {
    await token.deleteOne({refreshToken})
    return {refreshTokenValid: false, refreshTokenError: 'Re-Login'}
  }
  return {refreshTokenValid: true}
}

module.exports = {
  getUserByUserId,
  getUserByUid,
  updateUser,
  signUpUser,
  createToken,
  verifyRefreshToken,
}
