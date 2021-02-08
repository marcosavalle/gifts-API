import mongoose from 'mongoose'
import { StatusManager } from '../services/status-manager-service'
const Schema = mongoose.Schema

const giftSchema = new Schema({
  userSenderId: {
    type: mongoose.Schema.Types.ObjectId,
    index: true
  },
  userReceiverId: {
    type: mongoose.Schema.Types.ObjectId,
    index: true
  },
  createdDate: {
    type: Date
  },
  reasonId: {
    type: mongoose.Schema.Types.ObjectId,
    index: true
  },
  typeId: {
    type: mongoose.Schema.Types.ObjectId,
    index: true
  },
  senderName: {
    type: String
  },
  receiverName: {
    type: String
  },
  linkToken: {
    type: String
  },
  status: {
    main: {
      type: mongoose.Schema.Types.ObjectId
    },
    sec: {
      type: [mongoose.Schema.Types.ObjectId]
    }
  }
})

giftSchema.loadClass(StatusManager)
export const Gift = mongoose.model('gift', giftSchema, 'gifts')
