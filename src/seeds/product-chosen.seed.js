import { date, random } from 'faker'
import { Gift } from '../models/gift.model'
import { Status } from '../models/status.model'
import { ProductChosen } from '../models/product-chosen.model'
import { Product } from '../models/product.model'

export const seedProductsChosen = async () => {
  await ProductChosen.deleteMany()

  const rawStatus = await Status.find({ isMain: true }, '_id')
  const status = rawStatus.map(x => x._id)

  const rawGifts = await Gift.find({}, '_id')
  const gifts = rawGifts.map(x => x._id)

  const rawProducts = await Product.find({}, '_id')
  const products = rawProducts.map(x => x._id)

  const productsChosen = []

  for (let i = 0; i < gifts.length / 2; i++) {
    const p = {
      giftId: gifts[i],
      chosenProducts: [
        random.arrayElement(products),
        random.arrayElement(products)
      ],
      chosenDate: date.recent(),
      status: { main: random.arrayElement(status) }
    }

    productsChosen.push(p)
  }

  await ProductChosen.insertMany(productsChosen)
}
