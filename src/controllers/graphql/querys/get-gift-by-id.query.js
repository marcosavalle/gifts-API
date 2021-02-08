import { Gift } from '../../../models/gift.model'
import { GiftReason } from '../../../models/gift-reason.model'
import { GiftType } from '../../../models/gift-type.model'
import { StatusChange } from '../../../models/status-change.model'

export const getGiftById = async (parent, { id }, ctx, info) => {
  const gift = await Gift.findById(
    id,
    'createdDate senderName receiverName reasonId typeId status'
  )

  const reason = await GiftReason.findById(gift.reasonId, 'name').lean()
  const type = await GiftType.findById(gift.typeId, 'name').lean()
  const statusChange = await StatusChange.findOne({ documentId: id })
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
}
