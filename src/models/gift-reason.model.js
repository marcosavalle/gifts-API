import mongoose from 'mongoose'
const Schema = mongoose.Schema

const giftReasonSchema = new Schema({
  name: {
    type: String,
    index: true
  }
})

const GiftReason = mongoose.model('giftReason', giftReasonSchema, 'giftReasons')

export { GiftReason }
