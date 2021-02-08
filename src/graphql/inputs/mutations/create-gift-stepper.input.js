export const createGiftStepper = `

input CreateGiftStepOneInput {
    giftId: ID
    senderName: String!
    receiverName: String!
  }

  input CreateGiftStepTwoInput {
    giftId: ID!
    typeId: String!
    reasonId: String!
    maxAmount: Float!
  }

  input CreateGiftStepThreeInput {
    giftId: ID!
    categories: [CategoryInput]
    products: [ProductKeyValue]
  }

  input CreateGiftStepFourInput {
    giftId: ID!
    edit: Boolean
  }

`
