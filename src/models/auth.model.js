import mongoose from 'mongoose'
const Schema = mongoose.Schema

const authSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    index: true
  },
  meliToken: {
    type: String
  },
  meliRefreshToken: {
    type: String
  },
  expireDate: {
    type: Date
  }
})

export const Auth = mongoose.model('auth', authSchema, 'auth')
