export const statusDelivery = `
input StatusDelivery {
    giftId: String!
    status: DeliveryStatus!
}
enum DeliveryStatus {
    ACTIVE
    INPROGRESS
    FAILED
    DONE
}
`
