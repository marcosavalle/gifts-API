import { MeliService } from '../../../services/meli-service'

export const getMeliProductDetailsById = async (parent, { id }, ctx, info) => {
  try {
    const { data: product } = await MeliService.getProductDetailsById(id)
    const descriptions = []

    for (const description of product.descriptions) {
      const { data } = await MeliService.getProductDescriptionById(
        id,
        description.id
      )
      descriptions.push(data)
    }
    const meliProductDetails = {
      ...product
    }
    meliProductDetails.descriptions = descriptions

    return meliProductDetails
  } catch (error) {
    throw new Error(error)
  }
}
