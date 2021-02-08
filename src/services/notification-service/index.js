import { giftAccepted } from './dependencies/gift-accepted.notification'
import { giftRejected } from './dependencies/gift-rejected.notification'

class Notifications {
  static giftAccepted(ctx, gift) {
    giftAccepted(ctx, gift)
  }

  static giftRejected(ctx, gift) {
    giftRejected(ctx, gift)
  }
}

export default Notifications
