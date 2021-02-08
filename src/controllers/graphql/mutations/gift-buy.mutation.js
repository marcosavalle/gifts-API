import Gql from '../../../services/gql-service'
import { Gift } from '../../../models/gift.model'
import { Payment } from '../../../models/payment.model'
import { isEmpty } from '../../../helpers/verifyers'
import { Address } from '../../../models/address.model'
import { Delivery } from '../../../models/delivery.model'
import moment from 'moment'
import { isValidObjectId } from 'mongoose'
import { types } from '../../../constants/types'

const gql = new Gql()

export const giftBuy = async (parent, { input }, ctx, info) => {
  const gift = await Gift.findById(input.giftId)

  gql.checkUserLogged(ctx, gift?.userSenderId || null)

  gql.verify(async () => {
    const msj = []

    if (!isValidObjectId(input.giftId)) {
      msj.push('El ID ingresado es inválido')
    } else if (!gift) {
      msj.push('El regalo ingresado no existe')
    }

    if (isEmpty(input.mepaCollectionId)) {
      msj.push('Se debe ingresar collection_id de mercadopago')
    }

    if (isEmpty(input.mepaCollectionStatus)) {
      msj.push('Se debe ingresar collectionStatus de mercadopago')
    }

    if (isEmpty(input.mepaExternalReference)) {
      msj.push('Se debe ingresar externalReference de mercadopago')
    }

    if (isEmpty(input.mepaPaymentType)) {
      msj.push('Se debe ingresar paymentType de mercadopago')
    }

    if (isEmpty(input.mepaMerchantOrderId)) {
      msj.push('Se debe ingresar merchantOrder_id de mercadopago')
    }

    if (isEmpty(input.mepaPreferenceId)) {
      msj.push('Se debe ingresar preference_id de mercadopago')
    }

    if (isEmpty(input.mepaSiteId)) {
      msj.push('Se debe ingresar site_id de mercadopago')
    }

    if (isEmpty(input.mepaProcessingMode)) {
      msj.push('Se debe ingresar processingMode de mercadopago')
    }

    if (isEmpty(input.mepaMerchantAccountId)) {
      msj.push('Se debe ingresar merchantAccount_id de mercadopago')
    }

    if (!gift.isChosen()) {
      msj.push('No se puede pagar un regalo en esta instancia')
    }

    if (
      gift.typeId.toString() === types.remoto &&
      !(await Delivery.findOne({ giftId: input.giftId }))
    ) {
      msj.push(
        'El regalo es remoto y no se ha cargado el domicilio en un paso previo'
      )
    }

    if (gift.typeId.toString() === types.presencial && !input.addressId) {
      msj.push('Se debe ingresar ID de dirección para el delivery')
    } else if (gift.typeId.toString() === types.remoto && input.addressId) {
      msj.push('No se debe ingresar ID de dirección para un regalo remoto')
    } else if (input.addressId) {
      const address = await Address.findById(input.addressId)
      if (!address) {
        msj.push('La dirección no fue encontrada.')
      } else if (address.userId.toString() !== ctx.user.id) {
        msj.push('La dirección ingresada no pertenece al usuario')
      }
    }

    if (msj[0]) {
      return msj
    } else {
      return true
    }
  })

  return gql.mutation(async sess => {
    const payment = new Payment({
      giftId: input.giftId,
      paidDate: moment(),
      mepaCollectionId: input.mepaCollectionId,
      mepaCollectionStatus: input.mepaCollectionStatus,
      mepaExternalReference: input.mepaExternalReference,
      mepaPaymentType: input.mepaPaymentType,
      mepaMerchantOrderId: input.mepaMerchantOrderId,
      mepaPreferenceId: input.mepaPreferenceId,
      mepaSiteId: input.mepaSiteId,
      mepaProcessingMode: input.mepaProcessingMode,
      mepaMerchantAccountId: input.mepaMerchantAccountId
    })

    await gift.toPayed(ctx, sess)
    await payment.save({ session: sess })

    if (gift.typeId.toString() === types.presencial) {
      const newDelivery = new Delivery({
        giftId: input.giftId,
        deliveryAddressId: input.addressId
      })
      await newDelivery.toActive(ctx, sess)
    } else {
      const delivery = await Delivery.findOne({ giftId: input.giftId })
      await delivery.toActive(ctx, sess)
    }

    return ['La compra se realizó exitosamente']
  })
}
