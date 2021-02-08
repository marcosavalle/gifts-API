import { Status } from '../../../models/status.model'
import { status } from '../../../constants/status'

export const getAllGiftStatus = async () => {
  const statuses = []

  const statusDb = await Status.find().lean()
  statusDb.forEach(sta => {
    if (
      sta._id.toString() === status.inProgress ||
      sta._id.toString() === status.pending ||
      sta._id.toString() === status.chosen ||
      sta._id.toString() === status.active ||
      sta._id.toString() === status.payed ||
      sta._id.toString() === status.delivered ||
      sta._id.toString() === status.cancelled ||
      sta._id.toString() === status.done ||
      sta._id.toString() === status.rejected
    ) {
      const st = {
        id: sta._id,
        name: sta.name,
        isMain: sta.isMain
      }
      statuses.push(st)
    }
  })
  return statuses
}
