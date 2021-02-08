import { MeliService } from '../../../services/meli-service'

export const getMeliCategoryById = async (parent, { id }, ctxt, info) => {
  try {
    const { data: category } = await MeliService.getCategoryById(id)

    const pathRoots = category.path_from_root.map(path => ({
      meliId: path.id,
      name: path.name
    }))
    const childrenCategories = category.children_categories.map(children => ({
      meliId: children.id,
      name: children.name
    }))

    const meliCategory = {
      meliId: category.id,
      name: category.name,
      picture: category.picture,
      pathRoot: pathRoots,
      childrenCategories: childrenCategories
    }

    return meliCategory
  } catch (error) {
    throw new Error(error)
  }
}
