import { User } from '../../../models/user.model'
import { StatusChange } from '../../../models/status-change.model'
import { Status } from '../../../models/status.model'

export const getGiftStatusesHistory = async (parent, { id }, ctx) => {
  const statusesChanges = await StatusChange.find(
    { documentId: id },
    'newStatus date userId'
  )
    .sort({ date: -1 })
    .lean()
  return statusesChanges.map(async statusChange => {
    const status = await Status.findById(statusChange.newStatus.main).lean()
    const user = await User.findById(statusChange.userId).lean()

    return {
      status: {
        id: status._id,
        name: status.name,
        isMain: status.isMain
      },
      date: statusChange.date,
      user: {
        id: user._id,
        name: user.name,
        lastName: user.lastName,
        avatarUrl: user.avatarUrl
      }
    }
  })
}
