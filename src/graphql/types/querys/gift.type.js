export const gift = `
type Gift {
    id: ID
    userSender: ShortUser
    userReceiver: ShortUser
    createdDate: String
    reason: String
    type: String
    senderName: String
    receiverName: String
    productsChosen: ProductsChosen
    productFilter: ProductFilter
    delivery: Delivery
    payment: Payment
    status: Status
    lastUpdate: String
}
`
