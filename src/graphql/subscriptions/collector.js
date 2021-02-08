const gifts = `
    giftAcceptedOrRejected(userId: String!): Notification
`

export const subscriptions = `
type Subscription {
    ${gifts}
}
`
