import mongoose from 'mongoose'
import { StatusManager } from '../services/status-manager-service'
const Schema = mongoose.Schema

const provinceSchema = new Schema({
  name: {
    type: String
  },
  countryId: {
    type: mongoose.Schema.Types.ObjectId
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

provinceSchema.loadClass(StatusManager)
export const Province = mongoose.model('province', provinceSchema, 'provinces')
