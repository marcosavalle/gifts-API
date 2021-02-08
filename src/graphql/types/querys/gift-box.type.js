export const giftBox = `
type GiftBox {
    products: [ProductsToList]
    categories: [Category]
}

type ProductsToList {
    meliId: String!
    name: String!
    image: String!
    price: Float!
}
`
