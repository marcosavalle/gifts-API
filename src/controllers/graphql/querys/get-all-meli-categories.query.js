import { MeliService } from '../../../services/meli-service'

export const getAllMeliCategories = async (parent, { site }, ctxt, info) => {
  try {
    const { data: categories } = await MeliService.getCategoriesBySite(site)
    return categories.map(category => ({
      meliId: category.id,
      name: category.name
    }))
  } catch (error) {
    throw new Error(error)
  }
}
