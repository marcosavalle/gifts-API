import { GiftType } from '../models/gift-type.model'
import types from './data/types.json'

export const seedGiftTypes = async () => {
  await GiftType.deleteMany()

  const giftTypes = []

  for (const { _id, name } of types) {
    const s = { _id, name }
    giftTypes.push(s)
  }

  await GiftType.insertMany(giftTypes)
}
