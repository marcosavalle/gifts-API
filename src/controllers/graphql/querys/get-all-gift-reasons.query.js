import { GiftReason } from '../../../models/gift-reason.model'

export const getAllGiftReasons = async () => {
  const giftReasons = await GiftReason.find().lean()

  return giftReasons.map(giftReason => {
    return {
      id: giftReason._id,
      name: giftReason.name
    }
  })
}
