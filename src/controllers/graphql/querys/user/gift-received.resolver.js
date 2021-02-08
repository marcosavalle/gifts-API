import { Gift } from '../../../../models/gift.model'
import { GiftType } from '../../../../models/gift-type.model'
import { GiftReason } from '../../../../models/gift-reason.model'

export const giftReceived = async ({ id: userId }, args, ctx, info) => {
  const dbGifts = await Gift.find(
    {
      userReceiverId: userId
    },
    'userSenderId userReceiverId reasonId typeId senderName receiverName'
  ).lean()

  return dbGifts.map(async dbGift => {
    const { reasonId, typeId, senderName, receiverName } = dbGift
    const userReceiverId = dbGift?.userReceiverId || null
    const userSenderId = dbGift?.userSenderId || null

    const type = await GiftType.findOne(
      {
        _id: typeId
      },
      'name'
    ).lean()

    const typeName = type?.name || null

    const reason = await GiftReason.findOne(
      {
        _id: reasonId
      },
      'name'
    ).lean()

    const reasonName = reason?.name || null

    return {
      id: dbGift._id,
      userSender: userSenderId,
      userReceiver: userReceiverId,
      reason: reasonName,
      type: typeName,
      senderName,
      receiverName
    }
  })
}
