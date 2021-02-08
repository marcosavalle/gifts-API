const gift = `
    giftAccept(input: GiftAcceptInput!): Response
    giftBuy(input: GiftBuyInput!): Response
    giftSelect(input: GiftSelectInput!): Response
    giftDiscardBySender(giftId: String!): Response
    giftDiscardByReceiver(giftId: String!): Response
    createGiftStepOne(input: CreateGiftStepOneInput): ResponseId
    createGiftStepTwo(input: CreateGiftStepTwoInput): Response
    createGiftStepThree(input: CreateGiftStepThreeInput): Response
    createGiftStepFour(input: CreateGiftStepFourInput): Response
    resetGift(giftId: String!): Response
`
const address = `
    createOrUpdateAddress(input: AddressInput) : ResponseId
    addressActive(addressId: String!) : Response
    addressInactive(addressId: String!) : Response
`
const user = `
    updateUser(input: UserInput): Response
`
const product = `
`

const delivery = `
    changeStatusDelivery(input: StatusDelivery!) : Response
`

export const mutations = `
type Mutation {
   ${gift}
   ${address}
   ${user}
   ${product}
   ${delivery}
}
`
