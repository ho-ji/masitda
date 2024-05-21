const service = require('../services/userService')

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

    const accessToken = jwt.sign({_id: user._id}, process.env.ACCESS_TOKEN_KEY, {expiresIn: '10m'})
    const refreshToken = jwt.sign({_id: user._id}.process.env.REFRESH_TOKEN_KEY, {expiresIn: '7d'})

    res.cookie('refreshToken', refreshToken, {httpOnly: true, secure: true})
    res.status(200).json(accessToken)
  } catch (error) {
    res.status(500).json({
      message: 'Fail to Login',
    })
  }
}

const getUser = async (req, res) => {
  const {uid} = req
  try {
    const user = await User.findById(uid)
    if (!user) return res.status(401).json({message: 'User not found'})
    res.status(200).send(user.name)
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
