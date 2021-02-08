export const getUser = `query getUser {
    getUser {
        id
        name
        lastName
        email
        phone
        address {
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
        }
        avatarUrl
        giftSent {
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
            reason
            type
            senderName
            receiverName
            productsChosen {
                id
                chosenDate
            }
            productFilter {
                id
                maxAmount
            }
            delivery {
                id
                deliveredDate
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
        }
        giftReceived {
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
            reason
            type
            senderName
            receiverName
            productsChosen {
                id
                chosenDate
            }
            productFilter {
                id
                maxAmount
            }
            delivery {
                id
                deliveredDate
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
        }
        points
    }
}`

export const getShortUser = `query getUser {
    getUser {
        id
        name
        lastName
        email
        phone
        address {
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
        }
    }
}`
