import { Gift } from '../models/gift.model'
import { Product } from '../models/product.model'
import { ProductChosen } from '../models/product-chosen.model'
import { ProductFilter } from '../models/product-filter.model'
import { StatusChange } from '../models/status-change.model'
import { Status } from '../models/status.model'
import { Address } from '../models/address.model'
import { Delivery } from '../models/delivery.model'
import { Payment } from '../models/payment.model'
import { BlockedUser } from '../models/blocked-user.model'
import { RankingCategoriesReceiver } from '../models/ranking-categories-receiver.model'
import { RankingCategoriesSender } from '../models/ranking-categories-sender.model'
import { RankingProductsReceiver } from '../models/ranking-products-receiver.model'
import { RankingProductsSender } from '../models/ranking-products-sender.model'

export const deleteNotAll = async () => {
  await Promise.all([
    Gift.deleteMany(),
    Product.deleteMany(),
    ProductChosen.deleteMany(),
    ProductFilter.deleteMany(),
    StatusChange.deleteMany(),
    Status.deleteMany(),
    Address.deleteMany(),
    Delivery.deleteMany(),
    Payment.deleteMany(),
    BlockedUser.deleteMany(),
    RankingCategoriesReceiver.deleteMany(),
    RankingCategoriesSender.deleteMany(),
    RankingProductsReceiver.deleteMany(),
    RankingProductsSender.deleteMany()
  ])
}
