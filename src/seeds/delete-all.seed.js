import { User } from '../models/user.model'
import { Auth } from '../models/auth.model'
import { Login } from '../models/login.model'
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

export const deleteAll = async () => {
  await User.deleteMany()
  await Auth.deleteMany()
  await Login.deleteMany()
  await Gift.deleteMany()
  await Product.deleteMany()
  await ProductChosen.deleteMany()
  await ProductFilter.deleteMany()
  await StatusChange.deleteMany()
  await Status.deleteMany()
  await Address.deleteMany()
  await Delivery.deleteMany()
  await Payment.deleteMany()
  await BlockedUser.deleteMany()
  await RankingCategoriesReceiver.deleteMany()
  await RankingCategoriesSender.deleteMany()
  await RankingProductsReceiver.deleteMany()
  await RankingProductsSender.deleteMany()
}
