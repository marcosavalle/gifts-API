import mongoose from 'mongoose'
import { StatusManager } from '../services/status-manager-service'
const Schema = mongoose.Schema

const notificationSchema = new Schema({
  receiverId: {
    type: mongoose.Schema.Types.ObjectId,
    index: true
  },
  content: {
    type: String
  },
  dateSent: {
    type: Date
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

notificationSchema.loadClass(StatusManager)
const Notification = mongoose.model(
  'notification',
  notificationSchema,
  'notifications'
)

export { Notification }
