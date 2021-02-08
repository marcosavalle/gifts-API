import { Query } from './query-collector'
import { Mutation } from './mutation-collector'
import { Subscription } from './subscription-collector'
import { Address } from './querys/address/address-collector'
import { User } from './querys/user/user-collector'
import { Gift } from './querys/gift/gift-collector'
import { ProductsChosen } from './querys/products-chosen/products-chosen-collector'
import { Delivery } from './querys/delivery/delivery-collector'

export const resolvers = {
  Query,
  Mutation,
  Subscription,
  Address,
  User,
  Gift,
  ProductsChosen,
  Delivery
}
