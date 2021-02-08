export const mostChosen = `
type MostChosen {
    meliId: String
    name: String
    image: String
    rating: Float
}

enum MostChosenFilter{
    CATEGORIES
    PRODUCTS
}

enum MostChosenBy{
    SENDERS
    RECEIVERS
}

enum MostChosenPeriod{
    FOUR_WEEKS
    TWO_WEEKS
    ALL
}
`
