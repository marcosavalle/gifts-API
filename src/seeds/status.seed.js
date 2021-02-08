import { Status } from '../models/status.model'
import status from './data/status.json'

export const seedStatus = async () => {
  await Status.deleteMany()
  const statusList = []

  for (const { _id, name, isMain } of status) {
    const s = { _id, name, isMain }
    statusList.push(s)
  }

  await Status.insertMany(statusList)
}
