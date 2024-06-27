const User = require('../models/User')

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
  postUserOrderCount,
}
