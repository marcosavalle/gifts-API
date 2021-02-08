export const meliCategory = `
type MeliCategory {
    meliId: String
    name: String
    picture: String
    pathRoot: [Category]
    childrenCategories: [Category]
}
`
