import Gql from '../../../services/gql-service'
import { Address } from '../../../models/address.model'
import { Locality } from '../../../models/locality.model'
import { isValidObjectId } from 'mongoose'
import Joi from 'joi'
const gql = new Gql()

export const createOrUpdateAddress = async (parent, { input }, ctx, info) => {
  if (input.id) {
    const address = await Address.findById(input.id, 'userId')
    gql.checkUserLogged(ctx, address?.userId || null)
  }

  gql.joi(() => {
    const schema = Joi.object({
      name: Joi.string().min(2).max(20).required(),
      street: Joi.string().min(2).max(30).required(),
      number: Joi.string().min(1).max(10).required(),
      apt: Joi.string().min(1).max(10),
      description: Joi.string().min(1).max(40),
      postalCode: Joi.string().min(1).max(10).required(),
      localityId: Joi.string().min(1).max(30).required()
    })
    return schema.validate(input, { allowUnknown: true })
  })

  gql.verify(async () => {
    const msj = []

    if (isValidObjectId(input.localityId)) {
      const locality = await Locality.findById(input.localityId)

      if (!locality) {
        msj.push('Localidad inexistente')
      }
    } else {
      msj.push('LocalityId inválido')
    }

    if (msj[0]) {
      return msj
    } else {
      return true
    }
  })

  return gql.mutationCustom(async sess => {
    if (input.id) {
      const result = await Address.findByIdAndUpdate(input.id, input, {
        new: true
      }).session(sess)

      return {
        success: true,
        message: [`${result.name} se proceso correctamente`]
      }
    } else {
      const newAddress = new Address({
        street: input.street,
        number: input.number,
        apt: input.apt,
        description: input.description,
        postalCode: input.postalCode,
        localityId: input.localityId,
        name: input.name,
        contactPhone: input.contactPhone,
        userId: ctx.user.id
      })
      await newAddress.toActive(ctx, sess)

      return {
        success: true,
        message: [`${newAddress.name} se proceso correctamente`],
        id: newAddress._id
      }
    }
  })
}
