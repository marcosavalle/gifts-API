import mongoose from 'mongoose'
const Schema = mongoose.Schema

const statusChangeSchema = new Schema({
  collectionName: {
    type: String,
    index: true
  },
  documentId: {
    type: mongoose.Schema.Types.ObjectId,
    index: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    index: true
  },
  date: {
    type: Date
  },
  oldStatus: {
    main: {
      type: mongoose.Schema.Types.ObjectId
    },
    sec: {
      type: [mongoose.Schema.Types.ObjectId]
    }
  },
  newStatus: {
    main: {
      type: mongoose.Schema.Types.ObjectId
    },
    sec: {
      type: [mongoose.Schema.Types.ObjectId]
    }
  }
})

const StatusChange = mongoose.model(
  'statusChange',
  statusChangeSchema,
  'statusChanges'
)

export { StatusChange }
