import { getShortUser } from '../../constants/queries/getUser'
import {
  giftAccept,
  giftAcceptVariables
} from '../../constants/mutations/giftAccept'
import {
  giftSelect,
  giftSelectVariables
} from '../../constants/mutations/giftSelect'

import { service } from '../../services/service'
export class acceptAndSelectGift {
  static async Accept(input) {
    try {
      const data = await service.POST(giftAccept, input)
      const response = data.data.data.giftAccept
      return response
    } catch (error) {
      throw new Error(error)
    }
  }

  static async AcceptPerformance(arrayGiftsSender) {
    const response = []
    for (const gift of arrayGiftsSender) {
      giftAcceptVariables.input.giftId = gift
      try {
        const { data } = await service.POST(giftAccept, giftAcceptVariables)
        response.push(data.data.giftAccept)
      } catch (error) {
        throw new Error(error)
      }
    }
    return response
  }

  static async SelectPerformance(arrayGiftsSender, user) {
    const response = []

    const { data } = await service.POST(getShortUser)
    user = data.data.getUser
    for (const gift of arrayGiftsSender) {
      giftSelectVariables.input.giftId = gift
      giftSelectVariables.input.addressId = user.address[0].id
      try {
        const { data } = await service.POST(giftSelect, giftSelectVariables)
        response.push(data.data.giftSelect)
      } catch (error) {
        throw new Error(error)
      }
    }
    return response
  }
}
