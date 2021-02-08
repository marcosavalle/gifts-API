import Gql from '../../../services/gql-service'
import { Gift } from '../../../models/gift.model'
import { User } from '../../../models/user.model'
import { StatusChange } from '../../../models/status-change.model'
import mongoose from 'mongoose'
import { status } from '../../../constants/status'
import moment from 'moment'
const gql = new Gql()

export const giftDiscardBySender = async (parent, { giftId }, ctx, info) => {
  const gift = await Gift.findById(giftId)

  gql.checkUserLogged(ctx, gift?.userSenderId || null)

  gql.verify(async () => {
    const msj = []

    if (
      !(
        gift.isInProgress() ||
        gift.isPending() ||
        gift.isActive() ||
        gift.isChosen()
      )
    ) {
      msj.push('No se puede cancelar un regalo en esta instancia')
    }

    if (msj[0]) {
      return msj
    } else {
      return true
    }
  })

  return gql.mutation(async sess => {
    const messagge = []
    const user = await User.findById(ctx.user.id).session(sess)
    const points = user.points || 0

    if (gift.isInProgress() || gift.isPending()) {
      await gift.toCancelled(ctx, sess)
      messagge.push('Regalo cancelado por emisor')
    } else if (gift.isActive()) {
      const statusChange = await StatusChange.findOne(
        {
          documentId: giftId,
          'newStatus.main': mongoose.Types.ObjectId(status.active)
        },
        'date'
      ).session(sess)
      const acepted = moment(statusChange?.date)
      const today = moment()
      const diffDays = today.diff(acepted, 'days')

      if (diffDays === 0) {
        user.points = points + 10
        messagge.push(
          'Regalo cancelado por emisor con penalizacion de 10 puntos'
        )
      } else if (diffDays > 0 && diffDays < 8) {
        user.points = points + 10 + diffDays * 5
        messagge.push(
          `Regalo cancelado por emisor con penalizacion de ${
            10 + diffDays * 5
          } puntos`
        )
      } else {
        user.points = points + 100
        messagge.push(
          'Regalo cancelado por emisor con penalizacion de 100 puntos'
        )
      }

      await user.save({ session: sess })
      await gift.toCancelled(ctx, sess)
    } else if (gift.isChosen()) {
      await gift.toCancelled(ctx, sess)
      user.points = points + 100
      await user.save({ session: sess })
      messagge.push(
        'Regalo cancelado por emisor con penalizacion de 100 puntos'
      )
    }

    return messagge
  })
}
