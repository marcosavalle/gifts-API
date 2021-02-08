import { ProductFilter } from '../../../models/product-filter.model'
import { MeliService } from '../../../services/meli-service'

export const getGiftBox = async (parent, { giftId, site, page }, ctx, info) => {
  const productFilter = await ProductFilter.findOne(
    { giftId: giftId },
    'products categories maxAmount'
  ).lean()

  const arrayProducts = []
  const arrayCategories = []

  if (productFilter.products) {
    for (const product of productFilter.products) {
      const { data: meliProduct } = await MeliService.getProductDetailsById(
        product.meliId
      )
      if (meliProduct.price <= productFilter.maxAmount) {
        arrayProducts.push({
          meliId: product.meliId,
          name: meliProduct.title,
          image: meliProduct.thumbnail,
          price: meliProduct.price
        })
      }
    }
  }
  if (productFilter.categories) {
    for (const category of productFilter.categories) {
      arrayCategories.push({ meliId: category.meliId, name: category.name })
    }
  }

  const result = {
    products: arrayProducts,
    categories: arrayCategories
  }

  return result
}
