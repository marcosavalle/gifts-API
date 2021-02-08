import {
  name,
  address,
  lorem,
  image,
  internet,
  random,
  phone,
  date
} from 'faker'
import { User } from '../models/user.model'
import { Address } from '../models/address.model'
import { Locality } from '../models/locality.model'
import { Gift } from '../models/gift.model'
import { GiftReason } from '../models/gift-reason.model'
import { GiftType } from '../models/gift-type.model'
import categories from './data/categories.json'
import { ProductFilter } from '../models/product-filter.model'
import { Product } from '../models/product.model'
import products from './data/products.json'
import { ProductChosen } from '../models/product-chosen.model'
import { RankingCategoriesReceiver } from '../models/ranking-categories-receiver.model'
import { RankingCategoriesSender } from '../models/ranking-categories-sender.model'
import { RankingProductsReceiver } from '../models/ranking-products-receiver.model'
import { RankingProductsSender } from '../models/ranking-products-sender.model'

export const seedUserLogged = async (userA, q) => {
  // create another user
  const userB = new User({
    name: name.firstName(),
    lastName: name.lastName(),
    email: internet.email(),
    phone: phone.phoneNumber(),
    avatarUrl: image.avatar(),
    meliId: random.uuid(),
    meliNickname: `${name.firstName()}-${name.lastName()}`
  })
  await userB.save()

  // create 5 address for each one
  await Address.deleteMany()
  const rawLocalities = await Locality.find({}, '_id', { limit: 1000 }).lean()
  const localities = rawLocalities.map(x => x._id)

  const addresses = []
  const addressNames = [
    'Trabajo',
    'Casa',
    'Oficina',
    'Consultorio',
    'Suegro',
    'Suegra',
    'Casa de campo',
    'Estancia',
    'Club'
  ]

  for (let i = 0; i < 10; i++) {
    const a = {
      street: address.streetName(),
      number: random.number(),
      description: lorem.lines(1),
      postalCode: address.zipCode(),
      localityId: random.arrayElement(localities),
      name: random.arrayElement(addressNames),
      contactPhone: phone.phoneNumber(),
      userId: i % 2 === 0 ? userA._id : userB._id
    }

    addresses.push(a)
  }

  await Address.insertMany(addresses)

  // create gifts (half for each one)
  const rawGiftReasons = await GiftReason.find({}, '_id').lean()
  const giftReasons = rawGiftReasons.map(x => x._id)

  const rawGiftTypes = await GiftType.find({}, '_id').lean()
  const giftTypes = rawGiftTypes.map(x => x._id)

  const gifts = []

  for (let i = 0; i < q; i++) {
    const g = {
      userSenderId: i % 2 === 0 ? userB._id : userA._id,
      userReceiverId: i % 2 === 0 ? userA._id : userB._id,
      createdDate: date.between('2020-05-01', '2020-11-20'),
      reasonId: random.arrayElement(giftReasons),
      typeId: random.arrayElement(giftTypes),
      senderName: name.firstName(),
      receiverName: name.firstName(),
      status: { main: '5edbae001a43ad3034e4452b' }
    }

    gifts.push(g)
  }

  await Gift.insertMany(gifts)

  // create productFilter
  await ProductFilter.deleteMany()

  const rawGifts = await Gift.find({}, '_id')
  const giftsDb = rawGifts.map(x => x._id)

  const productsFilter = []

  for (const { _id } of giftsDb) {
    const p = {
      giftId: _id,
      maxAmount: random.number(3000),
      categories: [
        random.arrayElement(categories),
        random.arrayElement(categories)
      ]
    }

    productsFilter.push(p)
  }

  await ProductFilter.insertMany(productsFilter)

  // create products
  await Product.deleteMany()
  const productsList = []

  for (const product of products) {
    const p = {
      title: product.title,
      price: product.price,
      pictures: product.pictures[0].url,
      meliCategoryId: product.category_id,
      meliProductId: product.id
    }

    productsList.push(p)
  }

  await Product.insertMany(productsList)

  // Create productChosen
  await ProductChosen.deleteMany()

  const rawProducts = await Product.find({}, '_id')
  const productsDb = rawProducts.map(x => x._id)

  const productsChosen = []
  const categoriesNames = categories.map(x => x.name)

  for (const { _id } of giftsDb) {
    const p = {
      giftId: _id,
      chosenProducts: [
        random.arrayElement(productsDb),
        random.arrayElement(productsDb)
      ],
      categories: [
        random.arrayElement(categoriesNames),
        random.arrayElement(categoriesNames)
      ],
      chosenDate: date.recent(),
      price: random.number(3000)
    }

    productsChosen.push(p)
  }

  await ProductChosen.insertMany(productsChosen)

  // Create rankings
  const rankingCatSend = []
  for (let i = 0; i < 10; i++) {
    const { id, name } = categories[i]
    const a = {
      meliId: id,
      name: name,
      firstChosen: date.between('2020-05-01', '2020-11-20'),
      lastChosen: date.recent(),
      totalChosed: random.number(parseInt(q)),
      daysAcumulator: random.number(parseInt(q)),
      daysToChooseDelayAvg: random.float({ min: 0.01, max: 50 })
    }
    rankingCatSend.push(a)
  }
  await RankingCategoriesSender.insertMany(rankingCatSend)

  const rankingCatRec = []
  for (let i = 0; i < 10; i++) {
    const { id, name } = categories[i]
    const a = {
      meliId: id,
      name: name,
      firstChosen: date.between('2020-05-01', '2020-11-20'),
      lastChosen: date.recent(),
      totalChosed: random.number(parseInt(q)),
      daysAcumulator: random.number(parseInt(q)),
      daysToChooseDelayAvg: random.float({ min: 0.01, max: 50 })
    }
    rankingCatRec.push(a)
  }
  await RankingCategoriesReceiver.insertMany(rankingCatRec)

  const rankingProdRec = []
  for (let i = 0; i < 10; i++) {
    const { id, title, pictures } = products[i]
    const a = {
      meliId: id,
      name: title,
      image: pictures[0].url,
      firstChosen: date.between('2020-05-01', '2020-11-20'),
      lastChosen: date.recent(),
      totalChosed: random.number(parseInt(q)),
      daysAcumulator: random.number(parseInt(q)),
      daysToChooseDelayAvg: random.float({ min: 0.01, max: 50 })
    }
    rankingProdRec.push(a)
  }
  await RankingProductsReceiver.insertMany(rankingProdRec)

  const rankingProdSend = []
  for (let i = 0; i < 10; i++) {
    const { id, title, pictures } = products[i]
    const a = {
      meliId: id,
      name: title,
      image: pictures[0].url,
      firstChosen: date.between('2020-05-01', '2020-11-20'),
      lastChosen: date.recent(),
      totalChosed: random.number(parseInt(q)),
      daysAcumulator: random.number(parseInt(q)),
      daysToChooseDelayAvg: random.float({ min: 0.01, max: 50 })
    }
    rankingProdSend.push(a)
  }
  await RankingProductsSender.insertMany(rankingProdSend)
}
