import mongoose from 'mongoose'
const Schema = mongoose.Schema

const giftTypeSchema = new Schema({
  name: {
    type: String
  },
  description: {
    type: String
  }
})

const GiftType = mongoose.model('giftType', giftTypeSchema, 'giftTypes')

export { GiftType }
