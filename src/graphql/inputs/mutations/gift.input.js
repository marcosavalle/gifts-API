export const gift = `
  input GiftInput {
    id: ID
    userSenderId: String
    userReceiverId: String
    status: StatusObjectInput
    createdDate: String
    senderName: String
    receiverName: String
    linkToken: String
  }

  input GiftSendGiftInput {
    id: ID!
    userSenderId: String
    senderName: String
    receiverName: String
    typeId: String
    reasonId: String
  }

  input GiftSendProductFilterInput {
    maxAmount: Float
    categories: [CategoryInput]
    products: [ProductKeyValue]
  }

  input GiftAcceptInput {
    giftId: ID!
    accept: Boolean!
    blocked: Boolean!
  }

  input GiftBuyInput {
    giftId: String
    addressId: String
    mepaCollectionId: String
    mepaCollectionStatus: String
    mepaExternalReference: String
    mepaPaymentType: String
    mepaMerchantOrderId: String
    mepaPreferenceId: String
    mepaSiteId: String
    mepaProcessingMode: String
    mepaMerchantAccountId: String
  }

  input GiftSelectInput {
    giftId: ID!
    addressId: String
    products: [ProductInput]!
  }

  input ProductInput {
    title: String!
    price: Float!
    pictures: String!
    meliCategoryId: String!
    meliProductId: String!
  }

  input GiftSelectProductInput {
    title: String
    price: Float
    meliSellerId: String
    pictures: [String]
    meliCategoryId: String
    meliProductId: String
    warranty: String
    attributes: [GiftSelectProductAttributeVariationInput!]
    variations: [GiftSelectProductAttributeVariationInput!]
  }

  input GiftSelectProductAttributeVariationInput {
    meliId: String
    name: String
    meliValueId: String
    valueName: String
  }

`
