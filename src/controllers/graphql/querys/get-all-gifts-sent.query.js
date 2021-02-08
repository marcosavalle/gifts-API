import { Gift } from '../../../models/gift.model'
import { GiftReason } from '../../../models/gift-reason.model'
import { GiftType } from '../../../models/gift-type.model'
import { StatusChange } from '../../../models/status-change.model'

export const getAllGiftsSent = async (
  parent,
  { fromDate, toDate, statusId, sort },
  ctx,
  info
) => {
  let gifts
  sort = sort === 'ASC' ? 1 : -1

  if (statusId && fromDate && toDate) {
    gifts = await Gift.find({
      userSenderId: ctx.user.id,
      'status.main': statusId,
      $and: [
        { createdDate: { $gte: fromDate } },
        { createdDate: { $lte: toDate } }
      ]
    }).sort({ createdDate: sort })
  } else if (statusId && fromDate) {
    gifts = await Gift.find({
      userSenderId: ctx.user.id,
      'status.main': statusId,
      createdDate: { $gte: fromDate }
    }).sort({ createdDate: sort })
  } else if (statusId && toDate) {
    gifts = await Gift.find({
      userSenderId: ctx.user.id,
      'status.main': statusId,
      createdDate: { $lte: toDate }
    }).sort({ createdDate: sort })
  } else if (fromDate && toDate) {
    gifts = await Gift.find({
      userSenderId: ctx.user.id,
      $and: [
        { createdDate: { $gte: fromDate } },
        { createdDate: { $lte: toDate } }
      ]
    }).sort({ createdDate: sort })
  } else if (statusId) {
    gifts = await Gift.find({
      userSenderId: ctx.user.id,
      'status.main': statusId
    }).sort({ createdDate: sort })
  } else if (fromDate) {
    gifts = await Gift.find({
      userSenderId: ctx.user.id,
      createdDate: { $gte: fromDate }
    }).sort({ createdDate: sort })
  } else if (toDate) {
    gifts = await Gift.find({
      userSenderId: ctx.user.id,
      createdDate: { $lte: toDate }
    }).sort({ createdDate: sort })
  } else {
    gifts = await Gift.find({ userSenderId: ctx.user.id }).sort({
      createdDate: sort
    })
  }

  return gifts.map(async gift => {
    const reason = await GiftReason.findById(gift.reasonId, 'name').lean()
    const type = await GiftType.findById(gift.typeId, 'name').lean()
    const statusChange = await StatusChange.findOne({ documentId: gift._id })
      .sort({
        date: -1
      })
      .select('date')
      .lean()

    return {
      id: gift._id,
      createdDate: gift.createdDate,
      reason: reason?.name || null,
      type: type?.name || null,
      senderName: gift.senderName,
      receiverName: gift.receiverName,
      status: await gift.statusWithName(),
      lastUpdate: statusChange?.date || null
    }
  })
}
