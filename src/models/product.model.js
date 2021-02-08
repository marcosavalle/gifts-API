import mongoose from 'mongoose'
import { StatusManager } from '../services/status-manager-service'
const Schema = mongoose.Schema

const productSchema = new Schema({
  title: {
    type: String
  },
  meliSellerId: {
    type: String
  },
  price: {
    type: Number
  },
  pictures: {
    type: String
  },
  meliProductId: {
    type: String,
    index: true
  },
  meliCategoryId: {
    type: String,
    index: true
  },
  warranty: {
    type: String
  },
  attributes: {
    type: [Object]
  },
  variations: {
    type: [Object]
  }
})

productSchema.loadClass(StatusManager)
export const Product = mongoose.model('product', productSchema, 'products')
