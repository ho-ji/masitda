const mongoose = require('mongoose')

const tokenSchema = new mongoose.Schema({
  uid: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User'},
  token: {type: String, required: true},
  expiresAt: {type: Date, required: true},
})

module.exports = tokenSchema
