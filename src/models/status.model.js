import mongoose from 'mongoose'
const Schema = mongoose.Schema

const statusSchema = new Schema({
  name: {
    type: String
  },
  isMain: {
    type: Boolean
  }
})

export const Status = mongoose.model('status', statusSchema, 'status')
