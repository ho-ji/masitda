const mongoose = require('mongoose')

const mdPickSchema = new mongoose.Schema(
  {
    uid: {type: String, required: true},
    product: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'},
    reason: {type: String},
  },
  {
    versionKey: false,
  }
)

const MDPick = mongoose.model('MDPick', mdPickSchema)

module.exports = MDPick
