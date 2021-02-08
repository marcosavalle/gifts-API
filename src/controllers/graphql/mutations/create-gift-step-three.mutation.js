import Gql from '../../../services/gql-service'
import { ProductFilter } from '../../../models/product-filter.model'
import { isValidObjectId } from 'mongoose'
import { Gift } from '../../../models/gift.model'
import Joi from 'joi'
const gql = new Gql()

export const createGiftStepThree = async (parent, { input }, ctx, info) => {
  const gift = await Gift.findById(input.giftId)

  gql.checkUserLogged(ctx, gift?.userSenderId || null)

  gql.joi(() => {
    const schema = Joi.object({
      categories: Joi.array().items(
        Joi.object({
          meliId: Joi.string().min(3).required(),
          name: Joi.string().min(3).required()
        }).required()
      ),
      products: Joi.array().items(
        Joi.object({
          meliId: Joi.string().min(3).required(),
          name: Joi.string().min(3).required(),
          price: Joi.number().required(),
          picture: Joi.string().required(),
          meliCategoryId: Joi.string().min(3).required()
        }).required()
      )
    }).or('categories', 'products')
    return schema.validate(input, { allowUnknown: true })
  })

  gql.verify(async () => {
    const msj = []
    const productFilter = await ProductFilter.findOne(
      { giftId: input.giftId },
      'maxAmount'
    ).lean()

    if (!isValidObjectId(input.giftId)) {
      msj.push('Se debe asignar a un regalo válido')
    } else {
      if (!gift) {
        msj.push('El regalo no existe')
      } else {
        if (!productFilter) {
          msj.push('El regalo no ha completado el paso previo')
        } else {
          if (input.products) {
            for (const product of input.products) {
              if (product.price > productFilter.maxAmount) {
                msj.push(
                  `El producto ${product.meliId} - ${product.name} está fuera de presupuesto`
                )
              }
            }
          }
        }

        if (!gift.isInProgress() && !gift.isPending()) {
          msj.push('No se puede editar un regalo en esta instancia')
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
    await ProductFilter.findOneAndUpdate(
      { giftId: input.giftId },
      { categories: input.categories, products: input.products }
    ).session(sess)
    return [`La gift box se proceso correctamente`]
  })
}
