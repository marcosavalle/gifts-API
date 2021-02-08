import mongoose from 'mongoose'
import { StatusManager } from '../services/status-manager-service'
const Schema = mongoose.Schema

const deliverySchema = new Schema({
  giftId: {
    type: mongoose.Schema.Types.ObjectId,
    index: true
  },
  deliveredDate: {
    type: Date
  },
  deliveryAddressId: {
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
  },
  meliShipmentId: {
    type: String
  },
  meliTrackingNumber: {
    type: String
  }
})

deliverySchema.loadClass(StatusManager)
const Delivery = mongoose.model('delivery', deliverySchema, 'deliveries')

export { Delivery }
