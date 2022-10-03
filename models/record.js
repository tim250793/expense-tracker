const mongoose = require('mongoose')
const Schema = mongoose.Schema
const recordSchema = new Schema({
  name: { type: String, required: true },
  date: { type: String, required: true },
  amount: { type: Number, required: true},
  userId: { // 加入關聯設定
    type: Schema.Types.ObjectId,
    ref: 'User',
    index: true,
    required: true
   },
  categoryId: { type: Number, required: true },
  createAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Record', recordSchema)