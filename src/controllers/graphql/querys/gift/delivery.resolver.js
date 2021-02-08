import { Delivery } from '../../../../models/delivery.model'
import { Status } from '../../../../models/status.model'
import { User } from '../../../../models/user.model'
import { StatusChange } from '../../../../models/status-change.model'

export const delivery = async (parent, arg, ctx, info) => {
  const del = await Delivery.findOne(
    { giftId: parent.id },
    'deliveredDate'
  ).lean()

  if (!del) {
    return
  }
  const statusesChanges = await StatusChange.find(
    { documentId: del._id },
    'newStatus date userId'
  )
    .sort({ date: -1 })
    .lean()
  const response = {
    id: del._id,
    deliveredDate: del.deliveredDate,
    statusesHistory: statusesChanges.map(async statusChange => {
      const status = await Status.findById(statusChange.newStatus.main).lean()
      const user = await User.findById(statusChange.userId).lean()
      return {
        status: {
          id: status?._id || null,
          name: status?.name || null,
          isMain: status?.isMain || null
        },
        date: statusChange.date,
        user: {
          id: user?._id || null,
          name: user?.name || null,
          lastName: user?.lastName || null,
          avatarUrl: user?.avatarUrl || null
        }
      }
    })
  }

  return response
}
