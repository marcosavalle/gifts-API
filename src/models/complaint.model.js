import mongoose from 'mongoose'
import { StatusManager } from '../services/status-manager-service'
const Schema = mongoose.Schema

const complaintSchema = new Schema({
  meliComplaintId: {
    type: String,
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

complaintSchema.loadClass(StatusManager)
const Complaint = mongoose.model('complaint', complaintSchema, 'complaints')

export { Complaint }
