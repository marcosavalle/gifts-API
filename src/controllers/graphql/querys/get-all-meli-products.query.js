import { MeliService } from '../../../services/meli-service'
import { offsetLimit } from '../../../constants/meli'

export const getAllMeliProducts = async (parent, { input }, ctx, info) => {
  const { site, filters, maxAmount, page } = input

  try {
    let offset
    if (page <= 1) {
      offset = 0
    } else {
      offset = offsetLimit * (page - 1)
    }
    const { data: products } = await MeliService.getProducts(
      site,
      filters,
      ctx.auth.meliToken,
      offset,
      offsetLimit
    )
    const arrayProducts = []
    products.results.forEach(product => {
      if (product.price <= maxAmount) {
        arrayProducts.push(product)
      }
    })
    const meliProducts = {
      site_id: products.site_id,
      totalPages: Math.ceil(products.paging.total / offsetLimit),
      actualPage: page,
      query: products.query,
      paging: { ...products.paging },
      results: [...arrayProducts],
      sort: { ...products.sort },
      available_sorts: [...products.available_sorts],
      filters: [...products.filters],
      available_filters: [...products.available_filters]
    }

    return meliProducts
  } catch (error) {
    throw new Error(error)
  }
}
