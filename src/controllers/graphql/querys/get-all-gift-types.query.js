import { GiftType } from '../../../models/gift-type.model'

export const getAllGiftTypes = async () => {
  const giftTypes = await GiftType.find().lean()

  return giftTypes.map(giftType => {
    return {
      id: giftType._id,
      name: giftType.name,
      description: giftType.description
    }
  })
}
