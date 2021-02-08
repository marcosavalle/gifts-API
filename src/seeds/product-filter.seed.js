import { random } from 'faker'
import { Gift } from '../models/gift.model'
import { Status } from '../models/status.model'
import categories from './data/categories.json'
import { ProductFilter } from '../models/product-filter.model'

export const seedProductsFilter = async () => {
  await ProductFilter.deleteMany()

  const rawStatus = await Status.find({ isMain: true }, '_id')
  const status = rawStatus.map(x => x._id)

  const rawGifts = await Gift.find({}, '_id')
  const gifts = rawGifts.map(x => x._id)

  const productsFilter = []

  for (const { _id } of gifts) {
    const p = {
      giftId: _id,
      maxAmount: random.number(3000),
      categories: [
        random.arrayElement(categories),
        random.arrayElement(categories)
      ],
      status: { main: random.arrayElement(status) }
    }

    productsFilter.push(p)
  }

  await ProductFilter.insertMany(productsFilter)
}
