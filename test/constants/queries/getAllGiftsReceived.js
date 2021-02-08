export const getAllGiftsReceived = `query getAllGiftsReceived ($fromDate: String, $toDate: String, $statusId: String) {
    getAllGiftsReceived (fromDate: $fromDate, toDate: $toDate, statusId: $statusId) {
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
            products {
                id
                title
                price
                pictures
                warranty
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
    }
}`

export const getAllGiftsReceivedVariables = {
  fromDate: '2020-05-30T01:11:23.000+00:00'
}
