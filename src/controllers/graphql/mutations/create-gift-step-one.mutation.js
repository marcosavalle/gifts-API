import Gql from '../../../services/gql-service'
import { isEmpty } from '../../../helpers/verifyers'
import { Gift } from '../../../models/gift.model'
import { isValidObjectId } from 'mongoose'
import Joi from 'joi'
const gql = new Gql()

export const createGiftStepOne = async (
  parent,
  { input, input: { senderName, receiverName } },
  ctx,
  info
) => {
  gql.joi(() => {
    const schema = Joi.object({
      senderName: Joi.string().min(2).max(20),
      receiverName: Joi.string().min(2).max(20)
    })
    return schema.validate(input, { allowUnknown: true })
  })

  gql.verify(async () => {
    const msj = []

    if (input.giftId) {
      if (!isValidObjectId(input.giftId)) {
        msj.push('El ID del regalo es inválido')
      } else {
        const gift = await Gift.findById(input.giftId)
        if (!gift) {
          msj.push('El regalo no fué encontrado')
        } else {
          if (gift.userSenderId.toString() !== ctx.user.id) {
            msj.push('El usuario no está autorizado a realizar esta acción')
          }
          if (!gift.isInProgress() && !gift.isPending()) {
            msj.push('No se puede editar un regalo en esta instancia')
          }
        }
      }
    }

    if (isEmpty(senderName)) {
      msj.push('Debe proporcionar un nombre de emisor')
    }

    if (isEmpty(receiverName)) {
      msj.push('Debe proporcionar un nombre de receptor')
    }

    if (msj[0]) {
      return msj
    } else {
      return true
    }
  })

  return gql.mutationCustom(async sess => {
    if (input.giftId) {
      await Gift.findByIdAndUpdate(
        { _id: input.giftId },
        { senderName: senderName, receiverName: receiverName }
      ).session(sess)

      return {
        success: true,
        message: [`El regalo se actualizó correctamente.`]
      }
    } else {
      const newGift = new Gift({
        userSenderId: ctx.user.id,
        createdDate: new Date(),
        senderName: senderName,
        receiverName: receiverName
      })
      await newGift.toInProgress(ctx, sess)
      return {
        success: true,
        message: [`El regalo se generó correctamente.`],
        id: newGift._id
      }
    }
  })
}
