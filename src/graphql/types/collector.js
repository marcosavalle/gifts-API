// Common types
import { response } from './common/response.type'
import { status } from './common/status.type'
import { category } from './common/category.type'
import { item } from './common/item.type'
import { attribute } from './common/attribute.type'
import { shortUser } from './common/short-user.type'
import { shortProduct } from './common/short-product.type'

// Querys types
import { address } from './querys/address.type'
import { user } from './querys/user.type'
import { gift } from './querys/gift.type'
import { giftReason } from './querys/gift-reason.type'
import { giftType } from './querys/gift-type.type'
import { productFilter } from './querys/product-filter.type'
import { meliCategory } from './querys/meli-category.type'
import { meliProduct } from './querys/meli-product.type'
import { productsChosen } from './querys/products-chosen.type'
import { delivery } from './querys/delivery.type'
import { payment } from './querys/payment.type'
import { product } from './querys/product.type'
import { meliProductDetails } from './querys/meli-product-details.type'
import { giftBox } from './querys/gift-box.type'
import { mostChosen } from './querys/most-chosen.type'
import { statusesHistory } from './querys/statuses-history.type'
import { statistics } from './querys/statistics.type'
import { provinceAndLocality } from './querys/provinces-and-localities.type'

// Subscriptions types
import { notifications } from './subscriptions/notification.type'

export const types = `
    ${response}
    ${status}
    ${category}
    ${item}
    ${attribute} 
    ${shortUser}
    ${shortProduct}
    ${address}
    ${user}
    ${gift}
    ${giftReason}
    ${giftType}
    ${productFilter}
    ${meliCategory}
    ${meliProduct}
    ${productsChosen}
    ${delivery}
    ${payment} 
    ${product}
    ${meliProductDetails}
    ${notifications}
    ${giftBox}
    ${mostChosen}
    ${statusesHistory}
    ${statistics}
    ${provinceAndLocality}
`
