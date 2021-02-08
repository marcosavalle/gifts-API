import Gql from '../../../services/gql-service'
import { Address } from '../../../models/address.model'
const gql = new Gql()

export const addressInactive = async (parent, { addressId }, ctx, info) => {
  const address = await Address.findById(addressId, 'userId status')

  gql.checkUserLogged(ctx, address?.userId || null)

  gql.verify(async () => {
    const msj = []

    if (address.isInactive()) {
      msj.push('La dirección ya está inactiva')
    }

    if (msj[0]) {
      return msj
    } else {
      return true
    }
  })

  return gql.mutation(async sess => {
    await address.toInactive(ctx, sess)
    return ['Dirección desactivada']
  })
}
