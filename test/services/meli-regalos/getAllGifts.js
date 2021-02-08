import { service } from '../../services/service'
import {
  getAllGiftsSent,
  getAllGiftsSentVariables
} from '../../constants/queries/getAllGiftsSent'
import {
  getAllGiftsReceived,
  getAllGiftsReceivedVariables
} from '../../constants/queries/getAllGiftsReceived'
export class getAllGifts {
  static async Sent() {
    console.time('getAllGiftsSent')
    const { data } = await service.POST(
      getAllGiftsSent,
      getAllGiftsSentVariables
    )
    if (data) {
      console.timeEnd('getAllGiftsSent')
    }
  }

  static async Received() {
    console.time('getAllGiftsReceived')
    const { data } = await service.POST(
      getAllGiftsReceived,
      getAllGiftsReceivedVariables
    )
    if (data) {
      console.timeEnd('getAllGiftsReceived')
    }
  }
}
