const address = `
    getAddressById(id: ID!): Address
`
const users = `
    getUser: User
`
const gifts = `
    getGiftReasonById(id: ID): GiftReason
    getAllGiftReasons: [GiftReason]
    getGiftTypeById(id: ID): GiftType
    getAllGiftTypes: [GiftType]
    getGiftById(id: ID!): Gift
    getAllGiftStatus: [Status]
    getAllGiftsSent(fromDate: String, toDate: String, statusId: String, sort: Sort): [Gift]
    getAllGiftsReceived(fromDate: String, toDate: String, statusId: String, sort: Sort): [Gift]
    getGiftStatusesHistory(id: ID!): [StatusesHistory]
`
const products = `
    getProductFilterById(id: ID): ProductFilter
    getGiftBox(giftId: ID!): GiftBox
`
const meli = `
    getMeliCategoryById(id: ID): MeliCategory
    getAllMeliCategories(site: String): [MeliCategory]
    getAllMeliProducts(input: MeliProductInput): MeliProduct
    getMeliProductDetailsById(id: ID): MeliProductDetails
`
const mepa = `
    getPaymentUrl(input: MepaPaymentInput): String
`
const statistics = `
    getMostChosen(filter: MostChosenFilter!, choosenBy: MostChosenBy!, periodActivity: MostChosenPeriod!, limit: Int): [MostChosen]
    statisticsGifts(selector: SelectorStatistics!): [StatisticsGifts]
    statisticsBudget(selector: SelectorStatistics!): [StatisticsBudget]
    statisticsBudgetAvg(selector: SelectorStatistics!): Float
    statisticsCategories(selector: SelectorStatistics!): [StatisticsCategories]
`
const provincesAndLocalities = `
    getAllProvinces: [Province]
    getLocalitiesByProvinceId(provinceId: String!): [Locality]
`

export const querys = `
type Query {
    ${address}
    ${users}
    ${gifts}
    ${products}
    ${meli}
    ${mepa}
    ${statistics}
    ${provincesAndLocalities}
}
`
