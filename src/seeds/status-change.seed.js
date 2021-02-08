import { random, date } from 'faker'
import { Gift } from '../models/gift.model'
import { Status } from '../models/status.model'
import { StatusChange } from '../models/status-change.model'

export const seedStatusChanges = async () => {
  await StatusChange.deleteMany()

  const rawStatus = await Status.find({ isMain: true }, '_id')
  const status = rawStatus.map(x => x._id)

  const rawGifts = await Gift.find({}, '_id')
  const gifts = rawGifts.map(x => x._id)

  const changes = []

  for (const { _id } of gifts) {
    const c = {
      collectionName: 'gifts',
      documentId: _id,
      date: date.recent(),
      oldStatus: { main: random.arrayElement(status) },
      newStatus: { main: random.arrayElement(status) }
    }

    changes.push(c)
  }

  await StatusChange.insertMany(changes)
}
