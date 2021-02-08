import mongoose from 'mongoose'
import { StatusManager } from '../services/status-manager-service'
const Schema = mongoose.Schema

const paymentSchema = new Schema({
  giftId: {
    type: mongoose.Schema.Types.ObjectId,
    index: true
  },
  paidDate: {
    type: Date
  },
  status: {
    main: {
      type: mongoose.Schema.Types.ObjectId
    },
    sec: {
      type: [mongoose.Schema.Types.ObjectId]
    }
  },
  mepaCollectionId: {
    type: String
  },
  mepaCollectionStatus: {
    type: String
  },
  mepaExternalReference: {
    type: String
  },
  mepaPaymentType: {
    type: String
  },
  mepaMerchantOrderId: {
    type: String
  },
  mepaPreferenceId: {
    type: String
  },
  mepaSiteId: {
    type: String
  },
  mepaProcessingMode: {
    type: String
  },
  mepaMerchantAccountId: {
    type: String
  }
})

paymentSchema.loadClass(StatusManager)
export const Payment = mongoose.model('payment', paymentSchema, 'payments')
