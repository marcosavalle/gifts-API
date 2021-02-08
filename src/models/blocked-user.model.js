import mongoose from 'mongoose'
import { StatusManager } from '../services/status-manager-service'
const Schema = mongoose.Schema

const blockedUserSchema = new Schema({
  blockerId: {
    type: mongoose.Schema.Types.ObjectId,
    index: true
  },
  blockedId: {
    type: mongoose.Schema.Types.ObjectId,
    index: true
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

blockedUserSchema.loadClass(StatusManager)
const BlockedUser = mongoose.model(
  'blockedUser',
  blockedUserSchema,
  'blockedUsers'
)

export { BlockedUser }
