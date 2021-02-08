import { ProductFilter } from '../../../models/product-filter.model'

export const getProductFilterById = async (parent, { id }, ctxt, info) => {
  const response = await ProductFilter.findById(id).lean()
  response.id = response._id
  return response
}
