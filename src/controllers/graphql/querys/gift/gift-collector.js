import { userSender } from './user-sender.resolver'
import { userReceiver } from './user-receiver.resolver'
import { productsChosen } from './products-chosen.resolver'
import { productFilter } from './products-filter.resolver'
import { delivery } from './delivery.resolver'
import { payment } from './payment.resolver'

export const Gift = {
  userSender,
  userReceiver,
  productsChosen,
  productFilter,
  delivery,
  payment
}
