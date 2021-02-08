import mongoose from 'mongoose'
import { StatusManager } from '../services/status-manager-service'
const Schema = mongoose.Schema

const localitySchema = new Schema({
  name: {
    type: String,
    index: true
  },
  provinceId: {
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

localitySchema.loadClass(StatusManager)
const Locality = mongoose.model('locality', localitySchema, 'localities')

export { Locality }
