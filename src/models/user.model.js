import mongoose from 'mongoose'
import { StatusManager } from '../services/status-manager-service'
const Schema = mongoose.Schema

const userSchema = new Schema({
  name: {
    type: String
  },
  lastName: {
    type: String
  },
  email: {
    type: String,
    index: true
  },
  phone: {
    type: String
  },
  avatarUrl: {
    type: String
  },
  status: {
    main: {
      type: mongoose.Schema.Types.ObjectId
    },
    sec: {
      type: [mongoose.Schema.Types.ObjectId]
    }
  },
  meliId: {
    type: String,
    index: true
  },
  meliNickname: {
    type: String
  },
  points: {
    type: Number
  }
})

userSchema.loadClass(StatusManager)
export const User = mongoose.model('user', userSchema, 'users')
