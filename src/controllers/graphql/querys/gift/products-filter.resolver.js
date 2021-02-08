import { ProductFilter } from '../../../../models/product-filter.model'

export const productFilter = async (parent, arg, ctx, info) => {
  const prodFilt = await ProductFilter.findOne(
    { giftId: parent.id },
    'maxAmount categories products'
  ).lean()

  if (!prodFilt) {
    return
  }

  return {
    id: prodFilt._id,
    maxAmount: prodFilt.maxAmount,
    categories: prodFilt.categories,
    products: prodFilt.products
  }
}
