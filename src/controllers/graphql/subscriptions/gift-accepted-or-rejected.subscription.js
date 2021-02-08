import Gql from '../../../services/gql-service'
import { GIFT_ACCEPCTED_OR_REJECTED } from '../../../services/notification-service/constants'
const gql = new Gql()

export const giftAcceptedOrRejected = gql.subscriptionWithFilter(
  [GIFT_ACCEPCTED_OR_REJECTED],
  (payload, { userId }) => {
    return payload.giftAcceptedOrRejected.userId.toString() === userId
  }
)
