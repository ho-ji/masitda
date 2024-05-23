const service = require('../services/userService')
const {verifyAccessToken} = require('../utils/token')

const postUserSignUp = async (req, res) => {
  const info = req.body
  try {
    const user = await service.getUserByUserId(info.userId)
    if (user) {
      return res.status(409).json({
        message: 'User ID already exists',
      })
    }
    await service.signUpUser(user)
    res.status(201).json({message: 'User registered'})
  } catch (error) {
    res.status(500).json({
      message: 'Fail to Signup',
    })
  }
}

const getUserCheckUserId = async (req, res) => {
  const {userId} = req.params
  try {
    const user = await service.getUserByUserId(userId)
    if (user) {
      return res.status(409).json({
        message: 'User ID already exists',
      })
    }
    res.status(200).json({
      message: 'User ID does not exist',
    })
  } catch (error) {
    res.status(500).json({
      message: 'User ID is not available',
    })
  }
}

const postUserLogin = async (req, res) => {
  const {userId, password} = req.body
  try {
    const user = await service.getUserByUserId(userId)
    if (!user) return res.status(401).json({message: 'Invalid ID or password'})

    const successLogin = await user.passwordCheck(password)
    if (!successLogin) return res.status(401).json({message: 'Invalid ID or password'})

    const {accessToken, refreshToken} = await service.createToken(user._id)
    res.cookie('refreshToken', refreshToken, {httpOnly: true, secure: true})
    res.status(200).json(accessToken)
  } catch (error) {
    res.status(500).json({
      message: 'Fail to Login',
    })
  }
}

const getUser = async (req, res) => {
  const {uid, accessToken} = req.body
  const refreshToken = req.cookies.refreshToken
  try {
    const {accessTokenValid, accessTokenError} = verifyAccessToken(accessToken, uid)
    if (accessTokenError) {
      return res.status(400).json({message: accessTokenError})
    }
    if (!accessTokenValid) {
      const {refreshTokenValid, refreshTokenError} = service.verifyRefreshToken({uid, refreshToken})
      if (!refreshTokenValid) {
        return res.status(400).json({message: refreshTokenError})
      }
    }
    const {newAccessToken, newRefreshToken} = service.createToken(uid)
    const user = await service.getUserByUid(uid)
    if (!user) return res.status(401).json({message: 'User not found'})

    res.cookie('refreshToken', newRefreshToken, {httpOnly: true, secure: true})
    res.status(200).json({accessToken: newAccessToken, user: {name: user.name}})
  } catch (error) {
    res.status(500).json({message: 'Fail to Find User'})
  }
}

module.exports = {
  postUserLogin,
  postUserSignUp,
  getUserCheckUserId,
  getUser,
}
