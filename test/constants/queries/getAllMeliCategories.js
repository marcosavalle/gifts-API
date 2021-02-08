export const getAllMeliCategories = `query getAllMeliCategories ($site: String) {
    getAllMeliCategories (site: $site) {
        meliId
        name
        picture
        pathRoot {
            meliId
            name
        }
        childrenCategories {
            meliId
            name
        }
    }
}`

export const variableGetAllMeliCategories = {
  site: 'MLA'
}
