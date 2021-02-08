import mongoose from 'mongoose'
import { StatusManager } from '../services/status-manager-service'
const Schema = mongoose.Schema

const addressSchema = new Schema({
  street: {
    type: String
  },
  number: {
    type: String
  },
  apt: {
    type: String
  },
  description: {
    type: String
  },
  postalCode: {
    type: String
  },
  localityId: {
    type: mongoose.Schema.Types.ObjectId,
    index: true
  },
  name: {
    type: String
  },
  failedDeliveries: {
    type: Number
  },
  status: {
    main: {
      type: mongoose.Schema.Types.ObjectId
    },
    sec: {
      type: [mongoose.Schema.Types.ObjectId]
    }
  },
  contactPhone: {
    type: String
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    index: true
  }
})
addressSchema.loadClass(StatusManager)
export const Address = mongoose.model('address', addressSchema, 'addresses')
