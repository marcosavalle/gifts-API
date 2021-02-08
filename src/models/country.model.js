import mongoose from 'mongoose'
import { StatusManager } from '../services/status-manager-service'
const Schema = mongoose.Schema

const countrySchema = new Schema({
  name: {
    type: String,
    index: true
  },
  meliSite: {
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

countrySchema.loadClass(StatusManager)
const Country = mongoose.model('country', countrySchema, 'countries')

export { Country }
