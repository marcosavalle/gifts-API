import mongoose from 'mongoose'
import { StatusManager } from '../services/status-manager-service'
const Schema = mongoose.Schema

const productChosenSchema = new Schema({
  giftId: {
    type: mongoose.Schema.Types.ObjectId,
    index: true
  },
  chosenProducts: {
    type: [mongoose.Schema.Types.ObjectId]
  },
  chosenDate: {
    type: Date
  },
  price: {
    type: Number
  },
  categories: [String]
})

productChosenSchema.loadClass(StatusManager)
const ProductChosen = mongoose.model(
  'productChosen',
  productChosenSchema,
  'productsChosen'
)

export { ProductChosen }
