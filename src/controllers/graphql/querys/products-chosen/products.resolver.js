import { ProductChosen } from '../../../../models/product-chosen.model'
import { Product } from '../../../../models/product.model'

export const products = async (parent, arg, ctx, info) => {
  const pc = await ProductChosen.findById(parent.id).lean()

  return pc.chosenProducts.map(async productId => {
    const prod = await Product.findById(
      productId,
      'title price pictures meliCategoryId'
    ).lean()
    const object = {
      id: prod._id,
      title: prod.title,
      price: prod.price,
      pictures: prod.pictures,
      meliCategoryId: prod.meliCategoryId
    }

    return object
  })
}
