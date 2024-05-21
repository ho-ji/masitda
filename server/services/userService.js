const User = require('../models/User')

const getUserByUserId = async (userId) => {
  return await User.findOne({userId: userId})
}

const updateUser = async (user) => {
  await user.save()
}

const signUpUser = async (info) => {
  const user = new User(info)
  updateUser(user)
}

module.exports = {
  getUserByUserId,
  updateUser,
  signUpUser,
}
