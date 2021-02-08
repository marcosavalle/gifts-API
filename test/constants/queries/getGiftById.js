export const getGiftById = `query getGiftById ($id: ID!) {
    getGiftById (id: $id) {
        id
        userSender {
            id
            name
            lastName
            avatarUrl
        }
        userReceiver {
            id
            name
            lastName
            avatarUrl
        }
        createdDate
        reason
        type
        senderName
        receiverName
        productsChosen {
            id
            products {
                id
                title
                price
                pictures
                meliCategoryId
            }
            chosenDate
        }
        productFilter {
            id
            maxAmount
            categories {
                meliId
                name
            }
            products {
                meliId
                name
                price
                picture
                meliCategoryId
            }
        }
        delivery {
            id
            deliveredDate
            deliveryAddress {
                id
                street
                number
                apt
                description
                postalCode
                locality
                name
                contactPhone
                country
                province
                user {
                    id
                    name
                    lastName
                    avatarUrl
                }
                status {
                    id
                    name
                    isMain
                }
            }
            statusesHistory {
                status {
                    id
                    name
                    isMain
                }
                date
                user {
                    id
                    name
                    lastName
                    avatarUrl
                }
            }
        }
        payment {
            id
            paidDate
            name
        }
        status {
            id
            name
            isMain
        }
        lastUpdate
    }
}`
