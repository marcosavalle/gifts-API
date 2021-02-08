import Gql from '../../../services/gql-service'
import { isValidObjectId } from 'mongoose'
import { Gift } from '../../../models/gift.model'
import { ProductChosen } from '../../../models/product-chosen.model'

const gql = new Gql()

export const resetGift = async (parent, { giftId }, ctx) => {
  const gift = await Gift.findById(giftId)
  gql.checkUserLogged(ctx, gift?.userSenderId || null)
  gql.verify(async () => {
    const msj = []
    if (!isValidObjectId(giftId)) {
      msj.push('Se debe asignar a un regalo válido')
    } else {
      if (!gift) {
        msj.push('El regalo no existe')
      } else {
        if (!gift.isActive() && !gift.isChosen()) {
          msj.push('No se puede reiniciar un regalo en esta instancia')
        }
      }
    }

    if (msj[0]) {
      return msj
    } else {
      return true
    }
  })

  return gql.mutation(async sess => {
    await ProductChosen.findOneAndDelete({ giftId: giftId }).session(sess)
    gift.userReceiverId = null
    await gift.toPending(ctx, sess)
    return [`El regalo se reinició correctamente`]
  })
}
