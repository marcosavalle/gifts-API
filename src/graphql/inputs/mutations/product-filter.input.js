export const productFilter = `
input ProductFilterInput {
    giftId: String    
    maxAmount: Float
    categories: [CategoryInput]
    products: [ProductKeyValue]
}
`
