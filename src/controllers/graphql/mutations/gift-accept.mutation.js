import Gql from '../../../services/gql-service'
import Mailing from '../../../services/mailing-service'
import Notifications from '../../../services/notification-service'
import { Gift } from '../../../models/gift.model'
import { blockUser } from '../../../services/block-users-service'
import { isValidObjectId } from 'mongoose'
const gql = new Gql()

export const giftAccept = (parent, { input }, ctx, info) => {
  gql.verify(async () => {
    const msj = []

    const gift = await Gift.findOne({ _id: input.giftId })

    if (!isValidObjectId(input.giftId)) {
      msj.push('El ID ingresado es inválido')
    } else if (!gift) {
      msj.push('El regalo ingresado no existe')
    }

    if (input.accept && input.blocked) {
      msj.push('No se puede aceptar regalo y bloquear usuario simultáneamente.')
    }

    if (!gift.isPending()) {
      msj.push('No se puede aceptar un regalo en esta instancia')
    }

    if (msj[0]) {
      return msj
    } else {
      return true
    }
  })

  gql.withAfterMutation()
  return gql.mutation(async sess => {
    const message = []

    const gift = await Gift.findByIdAndUpdate(
      input.giftId,
      {
        userReceiverId: ctx.user.id
      },
      { new: true }
    ).session(sess)

    if (input.accept) {
      await gift.toActive(ctx, sess)
      message.push('El regalo fue aceptado correctamente')

      gql.afterMutation(() => {
        Notifications.giftAccepted(ctx, gift)
        Mailing.giftAccepted(input.giftId)
      })
    } else {
      await gift.toCancelled(ctx, sess)
      message.push('El regalo fue rechazado correctamente')

      gql.afterMutation(() => {
        Notifications.giftRejected(ctx, gift)
        Mailing.giftRejected(input.giftId)
      })

      if (input.blocked) {
        await blockUser(gift.userReceiverId, gift.userSenderId, sess, ctx)
        message.push('El usuario fue bloqueado correctamente')
      }
    }

    return message
  })
}
