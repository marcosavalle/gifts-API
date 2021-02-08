import mongoose from 'mongoose'
const Schema = mongoose.Schema

const productFilterSchema = new Schema({
  giftId: {
    type: mongoose.Schema.Types.ObjectId,
    index: true
  },
  maxAmount: {
    type: Number
  },
  categories: {
    type: [Object]
  },
  products: {
    type: [Object]
  }
})

export const ProductFilter = mongoose.model(
  'productFilter',
  productFilterSchema,
  'productFilters'
)
