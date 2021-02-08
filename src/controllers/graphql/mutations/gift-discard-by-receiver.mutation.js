import Gql from '../../../services/gql-service'
import { Gift } from '../../../models/gift.model'
const gql = new Gql()

export const giftDiscardByReceiver = async (parent, { giftId }, ctx, info) => {
  const gift = await Gift.findById(giftId)

  gql.checkUserLogged(ctx, gift?.userReceiverId || null)

  gql.verify(async () => {
    const msj = []

    if (!(gift.isPending() || gift.isActive() || gift.isChosen())) {
      msj.push('No se puede cancelar un regalo en esta instancia')
    }

    if (msj[0]) {
      return msj
    } else {
      return true
    }
  })

  return gql.mutation(async sess => {
    await gift.toCancelled(ctx, sess)
    return ['Regalo cancelado por receptor']
  })
}
