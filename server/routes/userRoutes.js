const router = require('express').Router()
const User = require('../models/User')
const jwt = require('jsonwebtoken')

router.post('/signup', async (req, res) => {
  const info = req.body
  try {
    const user = await User.findOne({userid: info.userid})
    if (user) {
      return res.status(409).json({
        message: 'User ID already exists',
      })
    }
    const newUser = new User(info)
    await newUser.save()
    res.status(201).json({message: 'User registered'})
  } catch (error) {
    res.status(500).json({
      message: 'Fail to Signup',
    })
  }
})

router.get('/check/:userid', async (req, res) => {
  const {userid} = req.params
  try {
    const user = await User.findOne({userid})
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
})

router.post('login', async (req, res) => {
  const {userid, password} = req.body
  try {
    const user = await User.findOne({userid})
    if (!user) return res.status(401).json({message: 'Invalid ID or password'})

    const successLogin = await user.passwordCheck(password)
    if (!successLogin) return res.status(401).json({message: 'Invalid ID or password'})

    const token = jwt.sign({_id: user._id}, 'masitdajwtsecretkey', {expiresIn: '1h'})
    res.status(200).json({message: 'Success to Login', token})
  } catch (error) {
    res.status(500).json({
      message: 'Fail to Login',
    })
  }
})

module.exports = router
