import { random, date, name } from 'faker'
import { User } from '../models/user.model'
import { Gift } from '../models/gift.model'
import { GiftReason } from '../models/gift-reason.model'
import { GiftType } from '../models/gift-type.model'
import { Status } from '../models/status.model'

export const seedGifts = async q => {
  await Gift.deleteMany()

  const rawUsers = await User.find({}, '_id')
  const users = rawUsers.map(x => x._id)

  const rawGiftReasons = await GiftReason.find({}, '_id')
  const giftReasons = rawGiftReasons.map(x => x._id)

  const rawGiftTypes = await GiftType.find({}, '_id')
  const giftTypes = rawGiftTypes.map(x => x._id)

  const rawStatus = await Status.find({ isMain: true }, '_id')
  const status = rawStatus.map(x => x._id)

  const gifts = []

  for (let i = 0; i < q; i++) {
    const g = {
      userSenderId: random.arrayElement(users),
      userReceiverId: random.arrayElement(users),
      createdDate: date.recent(),
      reasonId: random.arrayElement(giftReasons),
      typeId: random.arrayElement(giftTypes),
      senderName: name.firstName(),
      receiverName: name.firstName(),
      status: { main: random.arrayElement(status) }
    }

    gifts.push(g)
  }

  await Gift.insertMany(gifts)
}
