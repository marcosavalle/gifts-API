import { giftReceived } from './gift-received.resolver'
import { giftSent } from './gift-sent.resolver'
import { address } from './address.resolver'

const User = {
  giftReceived,
  giftSent,
  address
}

export { User }
