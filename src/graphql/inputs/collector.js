// Querys inputs
import { meliProduct } from './querys/meli-product.input'

// Mutations inputs
import { user } from './mutations/user.input'
import { gift } from './mutations/gift.input'
import { address } from './mutations/address.input'
import { productFilter } from './mutations/product-filter.input'
import { productChosen } from './mutations/product-chosen.input'
import { createGiftStepper } from './mutations/create-gift-stepper.input'
import { statusDelivery } from './mutations/status-delivery.input'

// Common inputs
import { status } from './common/status.input'
import { filter } from './common/filter.input'
import { category } from './common/category.input'
import { productKeyValue } from './common/product-key-value.input'
import { sort } from './common/sort.input'
import { mepaPayment } from './querys/mepa-payment.input'

export const inputs = `
    ${meliProduct}
    ${user}
    ${gift}
    ${address}
    ${productFilter}
    ${productChosen}
    ${status}
    ${filter}
    ${category}
    ${productKeyValue}
    ${createGiftStepper}
    ${sort}
    ${statusDelivery}
    ${mepaPayment}
`
