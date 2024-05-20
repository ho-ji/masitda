const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone_number: {
    type: String,
    required: true,
    match: /^(01[016789]{1})-?[0-9]{3,4}-?[0-9]{4}$/,
  },
  userid: {
    type: String,
    required: true,
    unique: true,
    match: /^[a-zA-Z][a-zA-Z0-9]{4,15}$/,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  },
  address: {
    zonecode: {type: String, required: true, match: /[0-9\-]{5}/},
    road_address: {type: String, required: true},
    detail_addresss: {type: String, required: true},
  },
})

userSchema.pre('save', async (next) => {
  const user = this
  if (!user.isModified('password')) return next()
  try {
    const salt = await bcrypt.getSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
  } catch (error) {
    next(error)
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User
