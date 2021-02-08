import Gql from '../../../services/gql-service'
import { isValidObjectId } from 'mongoose'
import { Gift } from '../../../models/gift.model'
import { GiftReason } from '../../../models/gift-reason.model'
import { GiftType } from '../../../models/gift-type.model'
import { ProductFilter } from '../../../models/product-filter.model'
import Joi from 'joi'
const gql = new Gql()

export const createGiftStepTwo = async (parent, { input }, ctx, info) => {
  const gift = await Gift.findById(input.giftId)

  gql.checkUserLogged(ctx, gift?.userSenderId || null)

  gql.joi(() => {
    const schema = Joi.object({
      maxAmount: Joi.number().min(500).max(100000).required()
    })
    return schema.validate(input, { allowUnknown: true })
  })

  gql.verify(async () => {
    const msj = []

    const { giftId, typeId, reasonId } = input

    if (!isValidObjectId(giftId)) {
      msj.push('Debe proporcionar un ID de regalo válido')
    } else {
      if (!gift) {
        msj.push('No se encontró un regalo con el ID proporcionado.')
      } else {
        if (!gift.isInProgress() && !gift.isPending()) {
          msj.push('No se puede editar un regalo en esta instancia')
        }
      }
    }

    if (reasonId || reasonId === '') {
      if (!isValidObjectId(reasonId)) {
        msj.push('Debe proporcionar un ID de razón de regalo válido.')
      } else {
        if (!(await GiftReason.findById(reasonId))) {
          msj.push('No se encontró una razón de regalo con el ID proporcionado')
        }
      }
    }

    if (typeId || typeId === '') {
      if (!isValidObjectId(typeId)) {
        msj.push('Debe proporcionar un ID de tipo de regalo válido')
      } else {
        if (!(await GiftType.findById(typeId))) {
          msj.push('No se encontró un tipo de regalo con el ID proporcionado')
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
    const { giftId, typeId, reasonId, maxAmount } = input
    const productFilter = await ProductFilter.findOne({ giftId }).session(sess)

    if (productFilter) {
      productFilter.maxAmount = maxAmount
      await productFilter.save({ session: sess })
    } else {
      const newProductFilter = new ProductFilter({
        giftId,
        maxAmount
      })

      await newProductFilter.save({ session: sess })
    }

    await Gift.findByIdAndUpdate({ _id: giftId }, { typeId, reasonId }).session(
      sess
    )
    return [`El regalo se procesó correctamente`]
  })
}
