import Gql from '../../../services/gql-service'
import { isEmpty } from '../../../helpers/verifyers'
import { Gift } from '../../../models/gift.model'
import { Delivery } from '../../../models/delivery.model'
import { Address } from '../../../models/address.model'
import { isValidObjectId } from 'mongoose'
import Joi from 'joi'

const gql = new Gql()

export const changeStatusDelivery = async (
  parent,
  { input, input: { giftId, status } },
  ctx,
  info
) => {
  const gift = await Gift.findById(giftId)

  gql.joi(() => {
    const schema = Joi.object({
      status: Joi.string().required()
    })
    return schema.validate(input, { allowUnknown: true })
  })
  gql.verify(async () => {
    const msj = []
    if (!isValidObjectId(giftId)) {
      msj.push('Debe proporcionar un ID de regalo válido')
    } else {
      if (!gift) {
        msj.push('No se encontró un regalo con el ID proporcionado.')
      }
    }
    if (isEmpty(status)) {
      msj.push('Debe proporcionar un estado')
    }
    if (msj[0]) {
      return msj
    } else {
      return true
    }
  })

  return gql.mutation(async sess => {
    const delivery = await Delivery.findOne({ giftId: giftId })
    if (delivery) {
      const address = await Address.findById(delivery.deliveryAddressId)
      switch (status) {
        case 'ACTIVE':
          await delivery.toActive(ctx, sess)
          break
        case 'INPROGRESS':
          await delivery.toInProgress(ctx, sess)
          break
        case 'FAILED': {
          await delivery.toFailedDelivery(ctx, sess)
          if (address) {
            address?.failedDeliveries || null
              ? address.failedDeliveries++
              : (address.failedDeliveries = 1)
            await Address.findByIdAndUpdate(address._id, address).session(sess)
            if (address.failedDeliveries >= 3) {
              if (!address.isFailedDelivery()) {
                await address.toFailedDelivery(ctx, sess)
              }
            }
          }
          break
        }
        case 'DONE':
          address.failedDeliveries = 0
          await Promise.all([
            delivery.toDone(ctx, sess),
            gift.toDone(ctx, sess),
            Address.findByIdAndUpdate(address._id, address)
          ])
          if (address.isFailedDelivery()) {
            await address.toActive(ctx, sess)
          }
          break

        default:
          break
      }
      return [`El cambio de estado se procesó correctamente`]
    } else {
      return {
        success: false,
        message: ['El regalo no tiene envío registrado']
      }
    }
  })
}
