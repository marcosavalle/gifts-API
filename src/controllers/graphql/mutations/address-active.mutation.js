import Gql from '../../../services/gql-service'
import { Address } from '../../../models/address.model'
const gql = new Gql()

export const addressActive = async (parent, { addressId }, ctx, info) => {
  const address = await Address.findById(addressId, 'userId status')

  gql.checkUserLogged(ctx, address?.userId || null)

  gql.verify(async () => {
    const msj = []

    if (address.isActive()) {
      msj.push('La dirección ya está activa')
    }

    if (msj[0]) {
      return msj
    } else {
      return true
    }
  })

  return gql.mutation(async sess => {
    await address.toActive(ctx, sess)
    return ['Dirección activada']
  })
}
